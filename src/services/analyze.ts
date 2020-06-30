import * as path from 'path'

import { encrypt } from './encrypt'
import { getBranches, getCommits, getRemotes, getRepository } from './git'
import { commitPresenter, remotePresenter } from './presenters'
import { ProgramOptions } from './program-options'

export const analyze = async (repoDir: string, options: ProgramOptions) => {
  const nodegitRepository = await getRepository(repoDir)
  const branches = await getBranches(nodegitRepository)

  const remotes = await getRemotes(nodegitRepository)
  const numberOfBranches = branches.filter((b) => b.isRemote()).length
  const numberOfTags = branches.filter((b) => b.isTag()).length

  const commits = await getCommits(nodegitRepository, options.emails)

  return {
    repoName: encrypt(path.basename(repoDir)),
    localUsernames: options.emails.map((email) => `User -> ${email}`),
    remotes: remotePresenter(remotes),
    primaryRemoteUrl: encrypt(remotes[0].url()),
    numberOfBranches,
    numberOfTags,

    commits: await commitPresenter(commits),

    emails_v2: [],
  }
}
