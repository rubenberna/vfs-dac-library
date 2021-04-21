import axios from 'axios'
import { URL_PATHS } from '../consts/api.consts'

export const getUser = (name) =>
  axios.get(URL_PATHS.GET_USER, {
    params: {
      name
    }
  })

export const getUserSec = (userTk) =>
  axios.get(URL_PATHS.GET_USER_SEC, {
    params: {
      user_tk: userTk
    }
  })

export const getDAMInfo = () => axios.get(URL_PATHS.GET_DAM_INFO)
