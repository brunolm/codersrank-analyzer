import { config } from 'dotenv'

config()

export const env = {
  github: {
    token: process.env.GITHUB_TOKEN,
  },
  codersRank: {
    sessionId: process.env.SESSION_ID,
  },

  salt: `${process.env.SALT}`,
  encrypt: true,
}
