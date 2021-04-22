import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

export const RegularAutocomplete = ({ options }) => {
  return (
    <Autocomplete
      className="regular-autocomplete"
      autoHighlight
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={(e, value) => console.log(value)}
      renderInput={(params) => (
        <TextField {...params} variant='outlined' placeholder='Type ahead'/>
      )}
    />
  )
}
