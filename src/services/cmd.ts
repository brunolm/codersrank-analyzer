import { exec, ExecOptions } from 'child_process'

export const run = async (cmd: string, options: ExecOptions = {}) => {
  return new Promise((resolve, reject) => exec(cmd, (err, result) => (err ? reject(err) : resolve(result))))
}
