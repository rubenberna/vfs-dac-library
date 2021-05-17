import { ACCESS_TOKEN, ACCOUNT } from '../consts/localstorage.consts'

const LocalStorageUtil = (() => {
  const _setAccessToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token)
  };

  const _setAccount = (account) => {
    localStorage.setItem(ACCOUNT, JSON.stringify(account));
  };

  const _getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN)
  };

  const _getAccount = () => {
    const accountString = localStorage.getItem(ACCOUNT);
    return accountString ? JSON.parse(accountString) : null;
  };

  const _removeAccessToken = () => {
    return localStorage.removeItem(ACCESS_TOKEN)
  };

  return {
    setAccessToken: _setAccessToken,
    setAccount: _setAccount,
    getAccessToken: _getAccessToken,
    getAccount: _getAccount,
    removeAccessToken: _removeAccessToken
  }
})()

export default LocalStorageUtil;
