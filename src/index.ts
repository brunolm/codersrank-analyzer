import { program } from 'commander'
import { dirSync } from 'tmp'

import { analyze } from './services/analyze'
import { getRepos } from './services/github'
import { ProgramOptions } from './services/program-options'
import { clone } from './services/scripts'

import * as fs from 'fs'

const start = async () => {
  program.version('1.0.0').requiredOption('-e, --emails <emails>', 'List of emails separated by ,')

  program.parse()

  const options: ProgramOptions = {
    emails: program.emails.split(/\s*,\s*/),
  }

  const dir = dirSync({ unsafeCleanup: true })

  try {
    const result = await getRepos()

    const test = result.find((s) => s.name === 'aeboilerplate')
    // const test = result.find((s) => s.name === 'dotfiles')
    // const test = result.find((s) => s.name === 'codersrank-analyzer')
    // const test = result.find((s) => s.name === 'full-stack-project')
    // const test = result.find((s) => s.name === 'angular-how-to')

    // const test = result[101]

    const cloned = await clone(test, dir.name)

    const analysisResult = await analyze(cloned, options)

    fs.writeFileSync(`output/aeboilerplate.json`, JSON.stringify(analysisResult, null, 2))
    // fs.writeFileSync(`output/codersrank-analyzer.json`, JSON.stringify(analysisResult, null, 2))
    // fs.writeFileSync(`output/dotfiles.json`, JSON.stringify(analysisResult, null, 2))
  } catch (err) {
    console.log('error', err)
  } finally {
    try {
      dir.removeCallback()
    } catch (err) {
      // console.log('ERROR, FAILED TO DELETE TEMP FOLDER', err)
    }
  }
}

process.on('uncaughtException', (err) => {
  console.error('ERROR: ', err)
})

process.on('unhandledRejection', (err) => {
  console.error('ERROR: ', err)
})

start()
