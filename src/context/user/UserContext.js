import createDataContextHelper from '../createDataContextHelper'
import { getUserSec } from '../../api/dac.api'

const TYPES = {
  SET_USER_DETAILS: 'user/setUserDetails',
  SET_USER_SEC: 'user/setUserSec',
}

const initialState = {
  userDetails: undefined,
  userSec: undefined
}

const userReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_USER_DETAILS:
      return { ...state, userDetails: action.payload }
    case TYPES.SET_USER_SEC:
      return { ...state, userSec: action.payload }
    default:
      return state
  }
}

const setUser = dispatch => (user) => {
  console.log({ user })
  dispatch({
    type: TYPES.SET_USER_DETAILS,
    payload: user
  })
}
const setUserSec = dispatch => async (user) => {
  console.log('stuff')
  const { data } = await getUserSec(user.USER_TK)
  dispatch({
    type: TYPES.SET_USER_SEC,
    payload: data
  })
}

export const { Provider, Context } = createDataContextHelper(
  userReducer,
  { setUser, setUserSec },
  initialState
)
