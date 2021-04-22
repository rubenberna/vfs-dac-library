import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import IconDelete from '../../../assets/images/iconDelete'

export const UserManagementBoardTableToolbar = ({numSelected}) => {
  return (
    <Toolbar
      className={`user-management__container--board__paper__table__toolbar${numSelected > 0 ? '--highlight' : ''}`}
    >
      {numSelected > 0 ? (
        <h4 color="inherit" className='table-title'>
          {numSelected} selected
        </h4>
      ) : (
        <h4 className='table-title'>
          Stuff
        </h4>
      )}

      {numSelected > 0 &&
      <Tooltip title="Delete">
        <IconButton aria-label="delete">
          <IconDelete/>
        </IconButton>
      </Tooltip>
      }
    </Toolbar>
  );
}
