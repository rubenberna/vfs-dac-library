import VFSAuth from 'vfs-msal-auth'
import LocalStorageUtil from './localstorage.util'

export const msalAcquireTokenSilent = async () => {
  const { token } = await VFSAuth.signIn()
  LocalStorageUtil.setAccessToken(token)
}

export const msalLogout = async () => {
  LocalStorageUtil.removeAccessToken()
  await VFSAuth.signOut()
}
