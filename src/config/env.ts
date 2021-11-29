import { config } from 'dotenv'

config()

export const env = {
  github: {
    token: process.env.GITHUB_TOKEN,
  },

  gitlab: {
    token: process.env.GITLAB_TOKEN,
  },

  salt: `${process.env.SALT}`,
  encrypt: true,
}
