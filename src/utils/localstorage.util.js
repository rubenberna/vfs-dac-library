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

  const _setAccount = (account: Account) => {
    localStorage.setItem(ACCOUNT, JSON.stringify(account));
  };

  const _getAccount = () => {
    const accountString = localStorage.getItem(ACCOUNT);
    return accountString ? JSON.parse(accountString) : null;
  };

  return {
    setAccessToken: _setAccessToken,
    getAccessToken: _getAccessToken,
    removeAccessToken: _removeAccessToken,
    setAccount: _setAccount,
    getAccount: _getAccount
  }
})()

export default LocalStorageUtil;
