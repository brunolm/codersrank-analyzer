import { exec } from 'child_process'

export const run = async (cmd: string) => {
  return new Promise((resolve, reject) => exec(cmd, (err, result) => (err ? reject(err) : resolve(result))))
}
