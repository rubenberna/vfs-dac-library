import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

export const AsyncAutocomplete = ({ options, handleSelection, handleSearch, isLoading }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Autocomplete
      autoHighlight
      className="async-autocomplete"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      getOptionLabel={(option) => option.label}
      options={options}
      loading={isLoading}
      onChange={handleSelection}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='outlined'
          placeholder='Search by name'
          onChange={e => handleSearch(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isLoading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  )
}
