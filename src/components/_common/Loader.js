import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

export const Loader = ({ isLoading }) => {
  return (
    <React.Fragment>
      { isLoading && <CircularProgress/> }
    </React.Fragment>
  )
}
