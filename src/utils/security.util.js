import VFSAuth from 'vfs-msal-auth'
import LocalStorageUtil from './localstorage.util'

export const msalAcquireTokenSilent = async () => {
  const { token, account, idToken } = await VFSAuth.signIn()
  LocalStorageUtil.setAccessToken(token)
  LocalStorageUtil.setAccount(account)
}

export const msalLogout = async () => {
  LocalStorageUtil.removeAccessToken()
  await VFSAuth.signOut()
}
