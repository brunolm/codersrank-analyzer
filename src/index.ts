import * as commander from 'commander'
import * as fs from 'fs-extra'
import { gitService } from './actions/git-service'
import * as github from './services/github'
import * as gitlab from './services/gitlab'

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
    .action(gitService.bind(this, github))

  commander
    .command('gitlab')
    .requiredOption('-e, --emails <emails>', 'List of emails separated by ,')
    .option('--public', 'Include public repositories')
    .option('--private', 'Include private repositories')
    .option(
      '-u, --upload',
      'WARNING: Automatically opens tabs on your default browser (will open 1 for each repository)',
    )
    .action(gitService.bind(this, gitlab))

  await commander.parseAsync()
}

process.on('uncaughtException', (err) => {
  console.error('uncaughtException: \n', err)
})

process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection: \n', err)
})

start()
