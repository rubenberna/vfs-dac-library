import React, { Fragment } from 'react'
import { UserManagementBoard } from './UserManagementBoard/UserManagementBoard'
import { UserManagementDetails } from './UserManagementDetails/UserManagementDetails'

export const UserManagement = ({ selectedUser, userSec, DAMInfo }) => {
  const shouldDisplay = selectedUser && userSec

  return (
    <Fragment>
      {shouldDisplay && (
        <div className='user-management'>
          <div className='user-management__container'>
            <UserManagementBoard userSec={userSec} DAMInfo={DAMInfo} />
            <UserManagementDetails selectedUser={selectedUser} />
          </div>
        </div>
      )}
    </Fragment>
  )
}
