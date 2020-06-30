import { Commit } from 'nodegit'

export interface CommitData {
  commit: Commit
  parents: string[]
  diffInfo: DiffInfo[]
  isMerge: boolean
  isDuplicated: boolean
  libraries?: Libraries
}

export interface DiffInfo {
  filename: string
  stats: any
}

export interface Libraries {
  [key: string]: string[]
}
