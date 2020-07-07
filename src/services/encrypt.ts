import * as md5 from 'md5'

import { env } from '../config/env'

export const encrypt = (str: string, useSalt = true): string => {
  if (!env.encrypt) {
    return str
  }

  if (useSalt) {
    return md5(`${str}${env.salt}`)
  }

  return md5(str)
}
