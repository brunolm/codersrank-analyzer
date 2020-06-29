import { Reference, Repository } from 'nodegit'

export const getBranches = async (nodegitRepo: Repository) => {
  const refs = await nodegitRepo.getReferences()

  const branchesRemoteFirst = [...refs.filter((ref) => ref.isRemote()), ...refs.filter((ref) => !ref.isRemote())]

  return branchesRemoteFirst.reduce((uniqueReferences, reference) => {
    if (!uniqueReferences.find((o) => o.name() === reference.name())) {
      uniqueReferences.push(reference)
    }

    return uniqueReferences
  }, [] as Reference[]) as Reference[]
}
