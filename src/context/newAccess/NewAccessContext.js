import createDataContextHelper from '../createDataContextHelper'
import { getDAMInfo, getDimensionData, giveAccess } from '../../api/dac.api'
import { defaultNewAccessValue } from '../../utils/newAccess.utils'

const TYPES = {
  SET_NEW_ACCESS_OPTIONS: 'newAccess/setNewAccessOptions',
  CHANGE_NEW_ACCESS_VALUE: 'newAccess/changeNewAccessValue',
  CLEAR_NEW_ACCESS_VALUES: 'newAccess/clearNewAccessValues',
  TOGGLE_NEW_ACCESS_ROW: 'newAccess/toggleNewAccessRow'
}

const initialNewAccessValues = {
  USER_TK: defaultNewAccessValue,
  DAM_TK: defaultNewAccessValue,
  DIMENSION_VALUE_TK: defaultNewAccessValue,
  DIMENSION_VALUE_TK_2: defaultNewAccessValue,
  DIMENSION_VALUE_TK_3: defaultNewAccessValue,
}

const initialState = {
  options: {},
  newAccess: { ...initialNewAccessValues },
  showNewAccessRow: false
}

const newAccessReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_NEW_ACCESS_OPTIONS:
      return {...state, options: {
        ...state.options,
        [action.key]: action.payload }
      }
    case TYPES.CHANGE_NEW_ACCESS_VALUE:
      return {...state, newAccess: {
        ...state.newAccess, ...action.payload
        }}
    case TYPES.CLEAR_NEW_ACCESS_VALUES:
      return { ...state, newAccess: initialNewAccessValues }
    case TYPES.TOGGLE_NEW_ACCESS_ROW:
      return {...state, showNewAccessRow: !state.showNewAccessRow }
    default:
      return state
  }
}

const loadDAMInfo = dispatch => async () => {
  const { data } = await getDAMInfo()
  dispatch({
    type: TYPES.SET_NEW_ACCESS_OPTIONS,
    key: 'damInfo',
    payload: data
  })
}

const loadDimensionData = dispatch => async () => {
  const promises = [1, 2, 3].map(number => getDimensionData(number))
  const all = await Promise.all(promises)
  all.forEach(({ data }, idx) => {
    const identifier = data[0].DIMENSION_TK
    dispatch({
      type: TYPES.SET_NEW_ACCESS_OPTIONS,
      key: `dimension${identifier}`,
      payload: data
    })
  })
}

export const toggleNewAccessRow = dispatch => () => {
  dispatch({
    type: TYPES.TOGGLE_NEW_ACCESS_ROW
  })
}

export const changeNewAccessValue = dispatch => (newValue) => {
  dispatch({
    type: TYPES.CHANGE_NEW_ACCESS_VALUE,
    payload: newValue
  })
}

export const clearNewAccessValues = dispatch => () => {
  dispatch({
    type: TYPES.CLEAR_NEW_ACCESS_VALUES
  })
}

export const saveNewAccess = () => async (newAccessDetails) => {
  const arrayOfItemValues = Object.entries(newAccessDetails).map(([key, item]) => ({ [key]: item.value }))
  const payloadObj = Object.assign({}, ...arrayOfItemValues)
  return await giveAccess(payloadObj)
}

export const {Provider, Context} = createDataContextHelper(
  newAccessReducer,
  { loadDAMInfo, loadDimensionData, changeNewAccessValue, saveNewAccess, toggleNewAccessRow, clearNewAccessValues },
  initialState
)
