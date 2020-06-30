import { config } from 'dotenv'

config()

export const env = {
  github: {
    token: process.env.GITHUB_TOKEN,
  },

  salt: `${process.env.SALT}`,
  encrypt: true,
}
