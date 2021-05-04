export const createOptions = (value, label) => ({
  value, label
})

export const getDefaultValue = (options, dimension) => {
  return options[dimension].find(item => {
    const name =  item.DIMENSION_VALUE_NAME
    if (name) return name.toLowerCase() === 'all'
  })
}

export const defaultNewAccessValue = { value: undefined, label: '' }

export const createNewAccessOptionsList = newAccessOptionsContext => {
  return Object.entries(newAccessOptionsContext).map(([key, value ], index) => {
    const property = index === 0 ? 'DAM_TK' : (index === 1 ? 'DIMENSION_VALUE_TK' : `DIMENSION_VALUE_TK_${index}`)
    const targetValue = index === 0 ? 'DAM_TK' : 'DIMENSION_VALUE_TK'
    const label = index === 0 ? 'DAM_NAME' : 'DIMENSION_VALUE_NAME'
    return {
      property,
      dimension: key,
      label,
      targetValue
    }
  })
}

export const createNewAccessOptionsFields = (arrayOfOptions, handleChangeCallback, fullOptionsList, newAccessContext) => {
  return arrayOfOptions.map(option => ({
      handleChange: (selection) => handleChangeCallback({ [option.property]: selection || defaultNewAccessValue }),
      items: fullOptionsList[option.dimension].map(item => createOptions(item[option.targetValue], item[option.label])),
      value: newAccessContext[option.property]
    })
  )
}
