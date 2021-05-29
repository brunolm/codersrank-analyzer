export interface CommitPresenter {
  authorName: string
  authorEmail: string
  createdAt: string
  commitHash: string
  changedFiles: ChangedFile[]
  libraries: any
}

export interface ChangedFile {
  fileName: string
  language: string
  insertions: number
  deletions: number
}
