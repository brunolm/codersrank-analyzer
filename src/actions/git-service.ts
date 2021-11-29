import * as chalk from 'chalk'
import * as fs from 'fs-extra'
import { dirSync } from 'tmp'
import { Repo } from '../models/repo'
import { analyze } from '../services/analyze'
import { upload } from '../services/codersrank/upload'
import { createChunk } from '../services/create-chunk'
import { encrypt } from '../services/encrypt'
import { ProgramOptions } from '../services/program-options'
import { clone } from '../services/scripts'
import JSZip = require('jszip')

export const gitService = async (service, program) => {
  const options: ProgramOptions = {
    emails: program.emails.split(/\s*,\s*/),
  }

  try {
    const allRepos: Repo[] = await service.getRepos({ isPublic: program.public, isPrivate: program.private })

    console.log('Found', allRepos.length, 'repos')

    const chunks = createChunk(allRepos, 8)

    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async (repo) => {
          try {
            console.log(chalk.blueBright`${repo.name}: Starting to parse ${repo.git_url}`)

            const dir = dirSync({ unsafeCleanup: true })

            const cloned = await clone(repo, dir.name)
            const analysisResult = await analyze(cloned, options)

            if (!analysisResult) {
              console.log(chalk.yellowBright`-${repo.name}: Skipping repo with no user commits`)

              return
            }

            const encryptedRepoName = encrypt(repo.name).toLowerCase()
            const filename = `${encryptedRepoName.replace(/[\s]/g, '-')}.json`
            const outputZip = `output/${filename}_v2_v2.json.zip`

            const fileContentsBuilder = []
            fileContentsBuilder.push(JSON.stringify(analysisResult.header))
            for (const commit of analysisResult.commits) {
              fileContentsBuilder.push(JSON.stringify(commit))
            }

            const zip = new JSZip()
            zip.file(filename, fileContentsBuilder.join('\n'))

            const data = await zip.generateAsync({ type: 'uint8array' })
            fs.writeFileSync(outputZip, data, 'binary')

            console.log(chalk.greenBright`${repo.name}: File created ${outputZip}`)

            if (program.upload) {
              try {
                await upload(outputZip, repo.name)
                console.log(chalk.greenBright`${repo.name}: File uploaded ${outputZip}`)
              } catch (err) {
                console.error(chalk.redBright`${repo.name}: Failed to upload ${outputZip}\n${err}\n`)
              }
            }

            dir.removeCallback()
          } catch (err) {
            // console.log(chalk.redBright`err`, err)
            // console.log('ERROR, FAILED TO DELETE TEMP FOLDER FOR', repo.name)
          }
        }),
      )
    }

    console.log(chalk.greenBright`Done parsing`, allRepos.length, 'repos')
  } catch (err) {
    console.log(chalk.redBright`Catch all error`, err)
  }

  console.log('Done! Exiting!')
  process.exit(0)
}
