import { hashSync } from 'bcrypt'

import { env } from '../config/env'

import * as md5 from 'md5'

export const encrypt = (str: string) => {
  if (!env.encrypt) {
    return str
  }

  return hashSync(`${str} ${env.salt}`, 3)
  // return md5(`${str} ${env.salt}`)
}
