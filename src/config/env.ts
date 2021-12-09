import { config } from 'dotenv'

config()

export const env = {
  github: {
    token: process.env.GITHUB_TOKEN,
  },

  gitlab: {
    token: process.env.GITLAB_TOKEN,
    base_url: process.env.BASE_GITLAB_API_URL,
  },

  salt: `${process.env.SALT}`,
  encrypt: true,
}
