import React, { Fragment, useContext } from 'react'
import { UserManagementDetails } from './UserManagementDetails/UserManagementDetails'
import { UserManagementBoard } from './UserManagementBoard/UserManagementBoard'
import { Context as UserContext } from '../../context/user/UserContext'

export const UserManagement = () => {
  const { state: { userSec, userDetails } } = useContext(UserContext)
  const shouldDisplay = userSec && userDetails

  return (
    <Fragment>
      {shouldDisplay && (
        <div className='user-management'>
          <div className='user-management__container'>
            <UserManagementBoard />
            <UserManagementDetails />
          </div>
        </div>
      )}
    </Fragment>
  )
}
