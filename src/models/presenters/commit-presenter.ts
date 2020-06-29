export interface CommitPresenter {
  authorName: string
  authorEmail: string
  createdAt: string
  commitHash: string
  isMerge: boolean
  parents: string[]
  changedFiles: ChangedFile[]
  isDuplicated: boolean
}

export interface ChangedFile {
  fileName: string
  language: string
  insertions: number
  deletions: number
}
