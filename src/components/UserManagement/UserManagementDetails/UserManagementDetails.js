import React, { useContext, useState } from 'react'
import Button from '@material-ui/core/Button';
import { Context as UserContext } from '../../../context/user/UserContext'
import { deleteUser } from '../../../api/dac.api'

export const UserManagementDetails = () => {
  const { state: { userDetails }, clearUser } = useContext(UserContext)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleDeleteUser = async () => {
    await deleteUser(userDetails.USER_TK)
    clearUser()
  }

  return (
    <div className='user-management__container--details'>
      <div className='u-flex u-flex__vertical u-margin-bottom-small'>
        <span className='heading-tertiary u-primary-color u-letter-spacing'>
          {userDetails.USER_NAME}
        </span>
        <span>{userDetails.USER_DBNAME}</span>
        <span>{userDetails.USER_ACCOUNT_ID}</span>
      </div>
      <Button color="secondary" className='button-danger' onClick={() => setShowConfirmation(true)}>delete user</Button>
      {
        showConfirmation &&
        <div className={showConfirmation ? 'flipInX' : 'fadeOutUp'}>
          <p>Are you sure?</p>
          <span className="u-margin-right-x-small u-color-danger u-cursor-pointer" onClick={handleDeleteUser}>Yes</span>
          <span className="u-cursor-pointer" onClick={() => setShowConfirmation(false)}>No</span>
        </div>
      }
    </div>
  )
}
