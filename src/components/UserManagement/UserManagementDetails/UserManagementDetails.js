import React from 'react'
import Button from '@material-ui/core/Button';

export const UserManagementDetails = ({ selectedUser }) => {
  return (
    <div className='user-management__container--details'>
      <div className='u-flex u-flex__vertical u-margin-bottom-small'>
        <span className='heading-tertiary u-primary-color u-letter-spacing'>
          {selectedUser.USER_NAME}
        </span>
        <span>{selectedUser.USER_DBNAME}</span>
        <span>{selectedUser.USER_ACCOUNT_ID}</span>
      </div>
      <Button color="secondary" className='button-danger'>delete user</Button>
    </div>
  )
}
