import createDataContextHelper from '../createDataContextHelper'
import { getUserSec, deleteAccess, getUser, findAdminByEmail, addAdmin, deleteAdmin } from '../../api/dac.api'
import { msalAcquireTokenSilent } from '../../utils/security.util'
import { setAuthInterceptors } from '../../config/api'
import LocalstorageUtil from '../../utils/localstorage.util'

const TYPES = {
  SET_USER_DETAILS: 'user/setUserDetails',
  SET_USER_SEC: 'user/setUserSec',
  CLEAR_USER: 'user/clearUser',
  SET_SEARCH_OPTIONS: 'user/setSearchOptions',
  SET_USER_IS_ADMIN: 'user/setUserIsAdmin',
  SET_LOADING: 'user/setLoading'
}

const initialState = {
  userDetails: undefined,
  userSec: undefined,
  searchOptions: [],
  userIsAdmin: false,
  loading: false
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
    case TYPES.SET_USER_IS_ADMIN:
      return { ...state, userIsAdmin: action.payload }
    case TYPES.SET_LOADING:
      return { ...state, loading: action.payload }
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

const isLoggedInUserAdmin = (dispatch) => async () => {
  const dummyAccount = 'anthony.de.smet@consultant.volvo.com'
  const account = (LocalstorageUtil.getAccount()).username
  const { data } = await findAdminByEmail(account)
  const userIsAdmin = !!data[0].length
  dispatch({
    type: TYPES.SET_USER_IS_ADMIN,
    payload: userIsAdmin
  })
}

const isSelectedUserAdmin = (dispatch) => async (userEmail) => {
  const { data } = await findAdminByEmail(userEmail)
  const userIsAdmin = !!data[0].length
  return userIsAdmin
}

const login = (dispatch) => async () => {
  await msalAcquireTokenSilent()
}

const makeAdmin = (dispatch) => async (user_tk) => {
  return await addAdmin(user_tk)
}

const removeAdmin = (dispatch) => async (user_tk) => {
  return await deleteAdmin(user_tk)
}

export const setLoading = (dispatch) => async (boolean) => {
  dispatch({
    type: TYPES.SET_LOADING,
    payload: boolean
  })
}

export const { Provider, Context } = createDataContextHelper(
  userReducer,
  {
    setUser,
    setUserSec,
    removeAccess,
    clearUser,
    setSearchOptions,
    login,
    makeAdmin,
    removeAdmin,
    isLoggedInUserAdmin,
    setLoading,
    isSelectedUserAdmin
  },
  initialState
)
