import { Repository } from 'nodegit'

export const getRemotes = async (nodegitRepo: Repository) => {
  return nodegitRepo.getRemotes()
}
