import createDataContextHelper from '../createDataContextHelper'
import { getDAMInfo, getDimensionData } from '../../api/dac.api'

const TYPES = {
  SET_NEW_ACCESS_OPTIONS: 'newAccess/setNewAccessOptions'
}

const initialState = {
  options: {
    damInfo: undefined,
    dimension1: undefined,
    dimension2: undefined,
    dimension3: undefined
  }
}

const newAccessReducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_NEW_ACCESS_OPTIONS:
      return {...state, options: {
        ...state.options,
        [action.key]: action.payload }
      }
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

export const {Provider, Context} = createDataContextHelper(
  newAccessReducer,
  { loadDAMInfo, loadDimensionData },
  initialState
)
