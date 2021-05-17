import createDataContextHelper from '../createDataContextHelper'
import { getUserSec, deleteAccess, getUser } from '../../api/dac.api'
import { msalAcquireTokenSilent } from '../../utils/security.util'

const TYPES = {
  SET_USER_DETAILS: 'user/setUserDetails',
  SET_USER_SEC: 'user/setUserSec',
  CLEAR_USER: 'user/clearUser',
  SET_SEARCH_OPTIONS: 'user/setSearchOptions'
}

const initialState = {
  userDetails: undefined,
  userSec: undefined,
  searchOptions: []
}

const userReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_USER_DETAILS:
      return { ...state, userDetails: action.payload }
    case TYPES.SET_USER_SEC:
      return { ...state, userSec: action.payload }
    case TYPES.CLEAR_USER:
      return initialState
    case TYPES.SET_SEARCH_OPTIONS:
      return { ...state, searchOptions: action.payload }
    default:
      return state
  }
}

const setSearchOptions = dispatch => async query => {
  try {
    const { data } = await getUser(query)
    const options = data?.map((user) => ({ label: user.USER_NAME, ...user }))
    dispatch({
      type: TYPES.SET_SEARCH_OPTIONS,
      payload: options
    })
  } catch (e) {
    console.log(e)
    dispatch({
      type: TYPES.SET_SEARCH_OPTIONS,
      payload: []
    })
  }
}

const setUser = dispatch => (user) => {
  dispatch({
    type: TYPES.SET_USER_DETAILS,
    payload: user
  })
}
const setUserSec = dispatch => async (user) => {
  const { data } = await getUserSec(user.USER_TK)
  dispatch({
    type: TYPES.SET_USER_SEC,
    payload: data
  })
}

const removeAccess = dispatch => async USER_SEC_TK => {
  return await deleteAccess(USER_SEC_TK)
}

const clearUser = dispatch => () => {
  dispatch({
    type: TYPES.CLEAR_USER
  })
}

export const login = (dispatch) => async () => {
  await msalAcquireTokenSilent()
}

export const { Provider, Context } = createDataContextHelper(
  userReducer,
  { setUser, setUserSec, removeAccess, clearUser, setSearchOptions, login },
  initialState
)
