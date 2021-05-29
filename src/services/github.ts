import { Octokit } from '@octokit/rest'
import { env } from '../config/env'
import { Repo } from '../models/repo'

const github = new Octokit({
  auth: env.github.token,
})

export const getRepos = async ({ isPublic, isPrivate }) => {
  let response: any

  let repos = []
  let page = 1

  do {
    let visibility = 'all'

    if (isPublic && isPrivate) {
      visibility = 'all'
    } else if (isPublic) {
      visibility = 'public'
    } else if (isPrivate) {
      visibility = 'private'
    }

    response = await github.repos.listForAuthenticatedUser({
      visibility: visibility as any,
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
