import { getRepos } from './services/github'
import { analyze } from './services/analyze'

import { clone } from './services/git'
import { dirSync } from 'tmp'

const start = async () => {
  const dir = dirSync({ unsafeCleanup: true })

  try {
    const result = await getRepos()

    const cloned = await clone(result[100], dir.name)
    
    await analyze(cloned)
  } catch (err) {
    console.log('error')
  } finally {
    dir.removeCallback()
  }
}

start()
