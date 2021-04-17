import axios from 'axios'
import { URL_PATHS } from '../consts/api.consts'

export const getUser = (name) =>
  axios.get(URL_PATHS.GET_USER, {
    params: {
      name
    }
  })
