import { ProjectSchema } from '@gitbeaker/core/dist/types/types'
import { Gitlab } from '@gitbeaker/node'
import { env } from '../config/env'
import { Repo } from '../models/repo'

const gitlab = new Gitlab({
  token: env.gitlab.token,
})

export const getRepos = async ({ isPublic, isPrivate }) => {
  let response: ProjectSchema[]

  let repos: ProjectSchema[] = []
  let page = 1

  do {
    response = await gitlab.Projects.all({
      pagination: 'offset',
      page,
      perPage: 100,
      visibility: isPrivate ? 'private' : 'public',
      membership: true,
    })

    if (!response.length) {
      break
    }

    repos.push(...response)

    ++page
  } while (true)

  return repos.map((rep) => ({
    name: rep.name,
    git_url: rep.ssh_url_to_repo,
    ssh_url: rep.ssh_url_to_repo,
  })) as Repo[]
}
