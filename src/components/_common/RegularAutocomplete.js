import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

export const RegularAutocomplete = ({ options, handleChange, value }) => {
  return (
    <Autocomplete
      className="regular-autocomplete"
      autoHighlight
      options={options}
      value={{ ...value }}
      getOptionLabel={(option) => option.label}
      onChange={(e, value) => handleChange(value)}
      renderInput={(params) => (
        <TextField {...params} variant='outlined' placeholder='Type ahead'/>
      )}
    />
  )
}

// getOptionSelected={(option) => {
//   console.log(option)
// }}
