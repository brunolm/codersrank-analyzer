import axios from 'axios'
import { env } from '../../config/env'
import { Repo } from '../../models/repo'

const gitlab = axios.create({
  baseURL: 'https://gitlab.com/api/v4',
  headers: {
    authorization: `Bearer ${env.gitlab.token}`,
  },
})

export const getRepos = async ({ isPublic, isPrivate }) => {
  let response

  let repos = []
  let page = 1

  do {
    response = await gitlab.get('/projects', {
      params: {
        pagination: 'offset',
        page,
        perPage: 100,
        visibility: isPrivate ? 'private' : 'public',
        membership: true,
      },
    })

    if (!response?.data?.length) {
      break
    }

    repos.push(...response.data)

    ++page
  } while (true)

  return repos.map((rep) => ({
    name: rep.name,
    git_url: rep.ssh_url_to_repo,
    ssh_url: rep.ssh_url_to_repo,
  })) as Repo[]
}
