import { Repository } from 'nodegit'

export const getRepository = (target: string) => {
  return Repository.open(target)
}
