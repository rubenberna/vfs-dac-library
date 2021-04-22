import React, { useContext } from 'react'
import Button from '@material-ui/core/Button';
import { Context as UserContext } from '../../../context/user/UserContext'

export const UserManagementDetails = () => {
  const { state: { userDetails } } = useContext(UserContext)

  return (
    <div className='user-management__container--details'>
      <div className='u-flex u-flex__vertical u-margin-bottom-small'>
        <span className='heading-tertiary u-primary-color u-letter-spacing'>
          {userDetails.USER_NAME}
        </span>
        <span>{userDetails.USER_DBNAME}</span>
        <span>{userDetails.USER_ACCOUNT_ID}</span>
      </div>
      <Button color="secondary" className='button-danger'>delete user</Button>
    </div>
  )
}
