import { Remote } from 'nodegit'

import { RemotePresenter } from '../../models/presenters/remote-presenter'
import { encrypt } from '../encrypt'

export const remotePresenter = (remotes: Remote[]) => {
  return remotes.reduce((obj, remote) => {
    obj[remote.name()] = encrypt(remote.url())

    return obj
  }, {} as RemotePresenter)
}
