import * as path from 'path'

import { encrypt } from './encrypt'
import { getBranches, getCommits, getRemotes, getRepository } from './git'
import { commitPresenter, remotePresenter } from './presenters'
import { ProgramOptions } from './program-options'

export const analyze = async (repoDir: string, options: ProgramOptions) => {
  const nodegitRepository = await getRepository(repoDir)
  const branches = await getBranches(nodegitRepository)
  // console.log(
  //   'branches',
  //   branches.map((b) => `${b.name()} -- ${b.shorthand()} -- remote: ${b.isRemote()} -- tag: ${b.isTag()}`),
  // )

  const remotes = await getRemotes(nodegitRepository)
  const numberOfBranches = branches.filter((b) => b.isRemote()).length
  const numberOfTags = branches.filter((b) => b.isTag()).length

  const commits = await getCommits(nodegitRepository, options.emails)

  return {
    repoName: encrypt(path.basename(repoDir)),
    localUsernames: options.emails.map((email) => `User -> ${email}`),
    remotes: remotePresenter(remotes),
    primaryRemoteUrl: encrypt(remotes[0].url()),
    numberOfBranches,
    numberOfTags,

    commits: await commitPresenter(commits),

    emails_v2: [],
  }
}

// isMerged = self.is_merge = len(self.parents) >= 2

// foreach branch
//   foreach commit
//     if commit already is list skip
//     keep a list of commits as
// self.original_author_name = author_name
// self.original_author_email = author_email
// self.author_name = author_name
// self.author_email = author_email
// self.created_at = created_at.strftime("%Y-%m-%d %H:%M:%S %z")
// self.hash = hash
// self.parents = []
// for parent in parents:
//     self.parents.append(parent.hexsha)
// self.is_merge = len(self.parents) >= 2
// self.branch = branch
// self.changed_files = []
// self.is_duplicated = False
// self.libraries = None

//     for branch in repo.branches:
//     ar.create_commits_entity_from_branch(branch.name)
// ar.flag_duplicated_commits()
// ar.get_commit_stats()
// r = ar.create_repo_entity(directory)

// # Stop parsing if there are no remotes
// if not r.original_remotes:
//     print('No remotes detected, will ignore this repo')
//     return

// # Ask the user if we cannot find remote URL
// if r.primary_remote_url == '':
//     answer = q.ask_primary_remote_url(r)

// if not r.contributors.items():
//     print('No authors detected, will ignore this repo')
//     return

// authors = [(c['name'], c['email']) for _, c in r.contributors.items()]
// identities = {}
// identities['user_identity'] = []

// # Stop parsing if there are no authors
// if len(authors) == 0:
//     print('No authors detected, will ignore this repo')
//     return

// identities_err = None
// identities = q.ask_user_identity(authors, identities_err, email)
// MAX_LIMIT = 50
// while len(identities['user_identity']) == 0 or len(identities['user_identity']) > MAX_LIMIT:
//     if len(identities['user_identity']) == 0:
//         identities_err = 'Please select at least one author'
//     if len(identities['user_identity']) > MAX_LIMIT:
//         identities_err = 'You cannot select more than', MAX_LIMIT
//     identities = q.ask_user_identity(authors, identities_err)
// r.local_usernames = identities['user_identity']

// if parse_libraries:
//     # build authors from the selection
//     # extract email from name -> email list
//     author_emails = [i.split(' -> ', 1)[1] for i in r.local_usernames]

//     if author_emails:
//         al = AnalyzeLibraries(r.commits, author_emails, repo.working_tree_dir,
//                               skip, commit_size_limit, file_size_limit)
//         libs = al.get_libraries()
//         # combine repo stats with libs used
//         for i in range(len(r.commits)):
//             c = r.commits[i]
//             if c.hash in libs.keys():
//                 r.commits[i].libraries = libs[c.hash]

// if not skip_obfuscation:
//     r = obfuscate(r)
// er = ExportResult(r)
// er.export_to_json_interactive(output, skip_upload)
