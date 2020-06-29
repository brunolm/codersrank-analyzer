import * as path from 'path'

import { Repo } from '../../models/repo'
import { run } from '../cmd'

export const clone = async (repo: Repo, target: string) => {
  const { ssh_url: url, name } = repo

  const targetDir = path.join(target, name.replace(/[^\w]/g, '-').replace(/[-]{2,}/, '-'))

  await run(`git clone ${url} ${targetDir}`)

  // TODO: @brunolm remove temp
  // const lsr = await run(`dir ${targetDir}`)

  // console.log('targetDir', targetDir)
  // console.log('lsr', lsr)

  return targetDir
}
