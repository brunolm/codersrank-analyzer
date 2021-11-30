import * as commander from 'commander'
import * as fs from 'fs-extra'
import { gitService } from './actions/git-service'
import * as file from './services/providers/file'
import * as github from './services/providers/github'
import * as gitlab from './services/providers/gitlab'

const tryFn = (fn, ...args) => {
  try {
    return fn(...args)
  } catch (err) {
    // console.error('err', err)
  }
}

export const start = async () => {
  try {
    await fs.mkdir('output')
  } catch (err) {}

  commander
    .command('github')
    .requiredOption('-e, --emails <emails>', 'List of emails separated by ,')
    .option('--public', 'Include public repositories')
    .option('--private', 'Include private repositories')
    .option(
      '-u, --upload',
      'WARNING: Automatically opens tabs on your default browser (will open 1 for each repository)',
    )
    .action((...args) => tryFn(gitService.bind(this, github), ...args))

  commander
    .command('gitlab')
    .requiredOption('-e, --emails <emails>', 'List of emails separated by ,')
    .option('--public', 'Include public repositories')
    .option('--private', 'Include private repositories')
    .option(
      '-u, --upload',
      'WARNING: Automatically opens tabs on your default browser (will open 1 for each repository)',
    )
    .action((...args) => tryFn(gitService.bind(this, gitlab), ...args))

  commander
    .command('file')
    .requiredOption('-e, --emails <emails>', 'List of emails separated by ,')
    .requiredOption('-p, --rootPath <rootPath>', 'Root path to look into for Git projects')
    .option(
      '-u, --upload',
      'WARNING: Automatically opens tabs on your default browser (will open 1 for each repository)',
    )
    .action((...args) => tryFn(gitService.bind(this, file), ...args))

  await commander.parseAsync()
}

process.on('uncaughtException', (err) => {
  // console.error('uncaughtException: \n', err)
})

process.on('unhandledRejection', (err) => {
  // console.error('unhandledRejection: \n', err)
})

start()
