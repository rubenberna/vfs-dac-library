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

export const getDimensionData = (number) =>
  axios.get(URL_PATHS.GET_DIMENSION_DATA, {
    params: {
      number
    }
  })

export const giveAccess = accessDetails =>
  axios.post(URL_PATHS.GIVE_ACCESS, { ...accessDetails })

export const deleteAccess = USER_SEC_TK =>
  axios.post(URL_PATHS.DELETE_ACCESS, { USER_SEC_TK })

export const createUser = userDetails =>
  axios.post(URL_PATHS.CREATE_USER, userDetails)

export const deleteUser = USER_TK =>
  axios.post(URL_PATHS.DELETE_USER, { USER_TK })

