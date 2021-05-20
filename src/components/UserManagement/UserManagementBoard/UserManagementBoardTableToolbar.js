import React, { useContext, useState } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import { Loader } from '../../_common/Loader'
import IconButton from '@material-ui/core/IconButton'
import IconDelete from '../../../assets/images/iconDelete'
import { Context as UserContext } from '../../../context/user/UserContext'
import { Context as NewAccessContext } from '../../../context/newAccess/NewAccessContext'

export const UserManagementBoardTableToolbar = ({ selected, handleRemoval }) => {
  const { state: { userDetails }, setUserSec, removeAccess } = useContext(UserContext)
  const { state: { showNewAccessRow }, toggleNewAccessRow } = useContext(NewAccessContext)
  const [isLoading, setIsLoading] = useState(false);
  const numSelected = selected.length

  const handleRemoveAccess = async () => {
    setIsLoading(true)
    const promises = selected.map(id => removeAccess(id))
    await Promise.all(promises)
    setUserSec(userDetails)
    setIsLoading(false)
    handleRemoval()
  }

  const renderTitle = () => (
    <h4 className='table-title'>
      Current access
    </h4>
  )

  const renderDeleteAccess = (numSelected, isLoading) => (
    <div className='toolbar-action-container'>
      <h4 color="inherit" className='table-title'>
        {numSelected} selected
      </h4>
      {numSelected > 0 && !isLoading &&
      <Tooltip title="Delete">
        <IconButton aria-label="delete" onClick={handleRemoveAccess}>
          <IconDelete/>
        </IconButton>
      </Tooltip>
      }
      <Loader isLoading={isLoading}/>
    </div>
  )

  const conditionalRender = () => {
    if (numSelected > 0) return renderDeleteAccess(numSelected, isLoading)
    return renderTitle()
  }

  return (
    <Toolbar
      className={`user-management__container--board__paper__table__toolbar${numSelected > 0 ? '--highlight' : '--default'}`}
    >
      { conditionalRender() }
    </Toolbar>
  );
}
