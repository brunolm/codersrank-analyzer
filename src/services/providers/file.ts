import * as fs from 'fs-extra'
import * as path from 'path'
import { Repo } from '../../models/repo'

async function* getGitProjectFolders(dir, depth = 0, max = 2) {
  if (depth > max) {
    return
  }

  const dirents = await fs.readdir(dir, { withFileTypes: true })
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name)
    if (dirent.isDirectory() && !/node_modules/i.test(dirent.name)) {
      if (/[.]git$/.test(res)) {
        yield res.replace(/.git$/, '')
      }
      yield* getGitProjectFolders(res, depth + 1, max)
    }
  }
}

export const getRepos = async ({ rootPath }) => {
  const repos = []

  for await (const projFolder of getGitProjectFolders(rootPath)) {
    repos.push(projFolder)
  }

  return repos.map((rep) => ({
    name: path.basename(rep),
    git_url: rep,
    ssh_url: rep,
    skipClone: true,
  })) as Repo[]
}
