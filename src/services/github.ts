import { Octokit } from '@octokit/rest'

import { env } from '../config/env'
import { Repo } from '../models/repo'

const github = new Octokit({
  auth: env.github.token,
})

export const getRepos = async () => {
  let response: any

  let repos = []
  let page = 1

  do {
    response = await github.repos.listForAuthenticatedUser({
      visibility: 'public',
      page,
      per_page: 100,
    })

    if (!response.data || !response.data.length) {
      break
    }

    repos.push(...response.data)

    ++page
  } while (true)

  return repos as Repo[]
}
