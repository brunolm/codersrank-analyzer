import { program } from 'commander'
import * as fs from 'fs-extra'
import JSZip = require('jszip')
import { dirSync } from 'tmp'

import { analyze } from './services/analyze'
import { upload } from './services/codersrank/upload'
import { createChunk } from './services/create-chunk'
import { getRepos } from './services/github'
import { ProgramOptions } from './services/program-options'
import { clone } from './services/scripts'

export const start = async () => {
  try {
    await fs.mkdir('output')
  } catch (err) {}

  program
    .version('1.0.0')
    .requiredOption('-e, --emails <emails>', 'List of emails separated by ,')
    .option('--public', 'Include public repositories')
    .option('--private', 'Include private repositories')
    .option(
      '-u, --upload',
      'WARNING: Automatically opens tabs on your default browser (will open 1 for each repository)',
    )

  program.parse()

  const options: ProgramOptions = {
    emails: program.emails.split(/\s*,\s*/),
  }

  try {
    const allRepos = await getRepos({ isPublic: program.public, isPrivate: program.private })

    const chunks = createChunk(allRepos, 8)

    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async (repo) => {
          try {
            console.log(`${repo.name}: Starting to parse`)

            const dir = dirSync({ unsafeCleanup: true })

            const cloned = await clone(repo, dir.name)
            const analysisResult = await analyze(cloned, options)

            const filename = `${repo.name.replace(/[\s]/g, '-')}.json`
            const outputZip = `output/${filename}.zip`

            const zip = new JSZip()
            zip.file(filename, JSON.stringify(analysisResult, null, 4))

            const data = await zip.generateAsync({ type: 'uint8array' })
            fs.writeFileSync(outputZip, data, 'binary')

            console.log(`${repo.name}: File created ${outputZip}`)

            if (program.upload) {
              try {
                await upload(outputZip, repo.name)
                console.log(`${repo.name}: File uploaded ${outputZip}`)
              } catch (err) {
                console.error(`${repo.name}: Failed to upload ${outputZip}\n${err}\n`)
              }
            }

            dir.removeCallback()
          } catch (err) {
            // console.log('err', err)
            // console.log('ERROR, FAILED TO DELETE TEMP FOLDER FOR', repo.name)
          }
        }),
      )
    }
  } catch (err) {
    console.log('Catch all error', err)
  }
}

process.on('uncaughtException', (err) => {
  console.error('uncaughtException: ', err)
})

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection: ', err)
})

start()
