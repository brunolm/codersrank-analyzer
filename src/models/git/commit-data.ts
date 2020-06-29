import { Commit, Diff } from 'nodegit'

export interface CommitData {
  commit: Commit
  parents: string[]
  diffInfo: DiffInfo[]
  isMerge: boolean
  isDuplicated: boolean
}

export interface DiffInfo {
  filename: string
  stats: any
}
