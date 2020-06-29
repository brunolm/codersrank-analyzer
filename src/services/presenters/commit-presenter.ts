import { DateTime } from 'luxon'
import * as path from 'path'

import { CommitData } from '../../models/git/commit-data'
import { ChangedFile, CommitPresenter } from '../../models/presenters/commit-presenter'
import { encrypt } from '../encrypt'
import { getLanguageFromExt } from '../get-language-from-ext'

export const commitPresenter = async (commiDatas: CommitData[]) => {
  const commits: CommitPresenter[] = []

  for (const commiData of commiDatas) {
    commits.push({
      authorName: encrypt(commiData.commit.author().name()),
      authorEmail: encrypt(commiData.commit.author().email()),
      createdAt: DateTime.fromJSDate(commiData.commit.date()).toLocal().toFormat('yyyy-MM-dd HH:mm:ss ZZZ'),
      commitHash: commiData.commit.sha(),
      isMerge: commiData.isMerge,
      parents: commiData.parents,
      changedFiles: commiData.isDuplicated
        ? []
        : await Promise.all(
            commiData.diffInfo.map(async ({ filename, stats }) => {
              const fileBase = path.parse(filename).base
              const ext = path.extname(filename) || fileBase
              const language = getLanguageFromExt(ext)

              const fileHash = encrypt(filename.split(/.[\S\s]+$/)[0])

              return {
                fileName: `${fileHash}${ext}`,
                language,
                insertions: stats.total_additions,
                deletions: stats.total_deletions,
              } as ChangedFile
            }),
          ),
      isDuplicated: commiData.isDuplicated,
    })
  }

  return commits
}
