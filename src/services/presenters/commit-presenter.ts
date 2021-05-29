import { DateTime } from 'luxon'
import * as path from 'path'
import { CommitData } from '../../models/git/commit-data'
import { ChangedFile, CommitPresenter } from '../../models/presenters/commit-presenter'
import { encrypt } from '../encrypt'
import { getLanguageFromExt } from '../get-language-from-ext'

export const commitPresenter = async (commiDatas: CommitData[]) => {
  const commits: CommitPresenter[] = []

  for (const commiData of commiDatas) {
    const changedFiles = commiData.isDuplicated
      ? []
      : await Promise.all(
          commiData.diffInfo.map(async ({ filename, stats }) => {
            const fileBase = path.parse(filename).base
            const ext = path.extname(filename) || fileBase
            const language = getLanguageFromExt(ext)

            const fileHash = encrypt(filename.split(/.[\S\s]+$/)[0])

            return {
              fileName: `${fileHash}${ext}`,
              insertions: stats.total_additions,
              deletions: stats.total_deletions,
              language,
            } as ChangedFile
          }),
        )

    if (!changedFiles.length) {
      continue
    }

    const libraries: any = {}

    if (changedFiles.some((f) => /[.]ts$/i.test(f.fileName))) {
      libraries.TypeScript = []
    }

    if (changedFiles.some((f) => /[.][jt]sx$/i.test(f.fileName))) {
      libraries.React = []
    }

    if (changedFiles.some((f) => /[.]component[.]ts$/i.test(f.fileName))) {
      libraries.Angular = []
    }

    commits.push({
      commitHash: commiData.commit.sha(),
      authorName: encrypt(commiData.commit.author().name(), false),
      authorEmail: encrypt(commiData.commit.author().email(), false),
      createdAt: DateTime.fromJSDate(commiData.commit.date()).toLocal().toFormat('yyyy-MM-dd HH:mm:ss ZZZ'),
      changedFiles,
      libraries,
    })
  }

  return commits
}
