# codersrank-analyzer

Does the same as [codersrank-org/repo_info_extractor](https://github.com/codersrank-org/repo_info_extractor/tree/master), but it's written in Node.js with TypeScript and allows you to analyze your entire GitHub collection at once.

## Usage

### Config

#### Required
```powershell
$env:GITHUB_TOKEN="token with repo permisson"
# (bash) export GITHUB_TOKEN="token with repo permisson"
```

#### Optional
```powershell
$env:SALT=PJSalt
# (bash) export SALT=some salt for encryption
```

### Parameters
```
Usage: index [options]

Options:
  -V, --version          output the version number
  -e, --emails <emails>  List of emails separated by ,
  --public               Include public repositories
  --private              Include private repositories
  -u, --upload           WARNING: Automatically opens tabs on your default browser (will open 1 for each repository)
  -h, --help             display help for command
```

### Run example
```powershell
npm start -- -e foo@bar.com,baz@foobar.com
```

----------

# NOT YET AVAILABLE, PLANNING:

### Run
```powershell
npx @brunolm/codersrank-analyzer --help
```

#### Example usage
```powershell
$env:GITHUB_TOKEN="token with repo permisson"
npx @brunolm/codersrank-analyzer -e e1@e1.com e2@e2.com --public --upload
```
