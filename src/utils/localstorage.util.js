import { ACCESS_TOKEN, ACCOUNT } from '../consts/localstorage.consts'

const LocalStorageUtil = (() => {
  const _setAccessToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token)
  };

  const _getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN)
  };

  const _removeAccessToken = () => {
    return localStorage.removeItem(ACCESS_TOKEN)
  };

  return {
    setAccessToken: _setAccessToken,
    getAccessToken: _getAccessToken,
    removeAccessToken: _removeAccessToken
  }
})()

export default LocalStorageUtil;
