import * as path from 'path'

import { Repo } from '../../models/repo'
import { run } from '../cmd'

export const clone = async (repo: Repo, target: string) => {
  const { ssh_url: url, name } = repo

  const targetDir = path.join(target, name.replace(/[^\w]/g, '-').replace(/[-]{2,}/, '-'))

  await run(`git clone ${url} ${targetDir}`)

  return targetDir
}
