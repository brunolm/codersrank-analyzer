import { Commit, Repository, Revwalk } from 'nodegit'

import { CommitData } from '../../models/git/commit-data'

export const getCommits = async (nodegitRepo: Repository, emails: string[]) => {
  const walker = Revwalk.create(nodegitRepo)
  walker.pushGlob('refs/heads/*')

  const gitCommits = (await walker.getCommitsUntil((_) => true)) as Commit[]

  const commitHashes = {}
  const commits: CommitData[] = []

  for (const gitCommit of gitCommits) {
    if (commitHashes[gitCommit.sha()]) {
      continue
    }

    commitHashes[gitCommit.sha()] = true

    const parents = (await gitCommit.getParents(10000)).map((parent) => parent.sha())
    const [diff] = await gitCommit.getDiff()
    const patches = await diff.patches()

    const diffInfo = patches.map((patch) => {
      return {
        filename: patch.newFile().path(),
        stats: patch.lineStats(),
      }
    })

    const isMerge = parents.length >= 2
    const isDuplicated = undefined

    // TODO: maybe someday
    const libraries = undefined

    commits.push({
      commit: gitCommit,
      parents,
      diffInfo,
      isMerge,
      isDuplicated,
      ...({ libraries } || {}),
    })
  }

  for (const commit of commits) {
    commit.isDuplicated = commit.isMerge && commit.parents.filter((parent) => commitHashes[parent]).length > 1
  }

  return commits
}
