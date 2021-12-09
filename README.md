# codersrank-analyzer

Does the same as [codersrank-org/repo_info_extractor](https://github.com/codersrank-org/repo_info_extractor/tree/master), but it's written in Node.js with TypeScript and allows you to analyze your entire GitHub collection at once.

## Usage

### Setup env options

```powershell
$env:SALT="Optional PJSalt"
$env:GITHUB_TOKEN="token with repo permisson https://github.com/settings/tokens"
$env:GITLAB_TOKEN="token with permissions https://gitlab.com/-/profile/personal_access_tokens"
$env:BASE_GITLAB_API_URL="url of the api endpoint for your gitlab instance: https://gitlab.mycompanyaddress.net/api/v4"
```

Bash

```bash
export SALT="Optional PJSalt"
export GITHUB_TOKEN="token with repo permisson https://github.com/settings/tokens"
export GITLAB_TOKEN="token with permissions https://gitlab.com/-/profile/personal_access_tokens"
```

### Run

```powershell
# github
npx @brunolm/codersrank-analyzer github -e "e1@e1.com,e2@e2.com" --private --upload

# gitlab
npx @brunolm/codersrank-analyzer gitlab -e "e1@e1.com,e2@e2.com" --private --upload

# folder and subfolders on local file system
npx @brunolm/codersrank-analyzer file -e "e1@e1.com,e2@e2.com" -p <ROOT_PATH> --upload
```

### Help

```powershell
npx @brunolm/codersrank-analyzer --help
```
