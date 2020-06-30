import { program } from 'commander'
import * as fs from 'fs'
import JSZip = require('jszip')
import { dirSync } from 'tmp'

import { analyze } from './services/analyze'
import { createChunk } from './services/create-chunk'
import { getRepos } from './services/github'
import { ProgramOptions } from './services/program-options'
import { clone } from './services/scripts'

const start = async () => {
  program.version('1.0.0').requiredOption('-e, --emails <emails>', 'List of emails separated by ,')

  program.parse()

  const options: ProgramOptions = {
    emails: program.emails.split(/\s*,\s*/),
  }

  try {
    const allRepos = (await getRepos()).filter((repo) => /brunolm/i.test(repo.url))

    const chunks = createChunk(allRepos, 8)

    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async (repo) => {
          try {
            const dir = dirSync({ unsafeCleanup: true })

            const cloned = await clone(repo, dir.name)
            const analysisResult = await analyze(cloned, options)

            const filename = `${repo.name.replace(/[\s]/g, '-')}.json`
            const zip = new JSZip()
            zip.file(filename, JSON.stringify(analysisResult, null, 4))
            const data = await zip.generateAsync({ type: 'uint8array' })
            fs.writeFileSync(`output/${filename}.zip`, data, 'binary')

            dir.removeCallback()
          } catch (err) {
            console.log('err', err)

            console.log('ERROR, FAILED TO DELETE TEMP FOLDER FOR', repo.name)
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
