import { client } from '../config/api'
import { URL_PATHS } from '../consts/api.consts'

export const getUser = (name) =>
  client.get(URL_PATHS.GET_USER, {
    params: {
      name
    }
  })

export const getUserSec = (userTk) =>
  client.get(URL_PATHS.GET_USER_SEC, {
    params: {
      user_tk: userTk
    }
  })

export const getDAMInfo = () => client.get(URL_PATHS.GET_DAM_INFO)

export const getDimensionData = (number) =>
  client.get(URL_PATHS.GET_DIMENSION_DATA, {
    params: {
      number
    }
  })

export const giveAccess = accessDetails =>
  client.post(URL_PATHS.GIVE_ACCESS, { ...accessDetails })

export const deleteAccess = USER_SEC_TK =>
  client.post(URL_PATHS.DELETE_ACCESS, { USER_SEC_TK })

export const createUser = userDetails =>
  client.post(URL_PATHS.CREATE_USER, userDetails)

export const deleteUser = USER_TK =>
  client.post(URL_PATHS.DELETE_USER, { USER_TK })

export const findAdminByEmail = email =>
  client.get(URL_PATHS.FIND_ADMIN, {
    params: {
      email
    }
  })

export const addAdmin = user_tk =>
  client.post(URL_PATHS.ADD_ADMIN, { user_tk })

export const deleteAdmin = user_tk => 
  client.post(URL_PATHS.DELETE_ADMIN, { user_tk })

