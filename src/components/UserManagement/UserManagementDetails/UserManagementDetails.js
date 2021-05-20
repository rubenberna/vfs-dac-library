import React, { useContext, useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Context as UserContext } from '../../../context/user/UserContext'
import { deleteUser } from '../../../api/dac.api'

export const UserManagementDetails = () => {
  const { state: { userDetails, userIsAdmin }, clearUser, isSelectedUserAdmin, makeAdmin, removeAdmin } = useContext(UserContext)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [seletecUserIsAdmin, setSeletectedUserIsAdmin] = useState(false)

  const handleDeleteUser = async () => {
    await deleteUser(userDetails.USER_TK)
    clearUser()
  }

  const checkIfSelectedUserIsAdmin = async (userEmail) => {
    const isAdmin = await isSelectedUserAdmin(userEmail)
    setSeletectedUserIsAdmin(isAdmin)
  }

  useEffect(() => {
    if (userDetails) {
      checkIfSelectedUserIsAdmin(userDetails.USER_EMAIL)
    }
  }, [userDetails])

  const adminDetails = () => {
    const adminClass = seletecUserIsAdmin ? 'admin' : 'not-admin';
    const text = seletecUserIsAdmin ? 'Admin' : 'Not Admin';

    return <span
      className={`user-management__container--details--${adminClass}`}>
      {text}
    </span>
  }

  const handleSwitchChange = async (e) => {
    const { checked } = e.target
    if (checked) {
      await makeAdmin(userDetails.USER_TK)
      checkIfSelectedUserIsAdmin(userDetails.USER_EMAIL)
    } else {
      await removeAdmin(userDetails.USER_TK)
      checkIfSelectedUserIsAdmin(userDetails.USER_EMAIL)
    }
  }

  return (
    <div className='user-management__container--details'>
      <div className='u-flex u-flex__vertical u-margin-bottom-small'>
        <span className='heading-tertiary u-primary-color u-letter-spacing'>
          {userDetails.USER_NAME}
        </span>
        <span>{userDetails.USER_DBNAME}</span>
        <span>{userDetails.USER_ACCOUNT_ID}</span>
        { adminDetails() }
        <FormControlLabel
          control={<Switch
            name="seletecUserIsAdmin"
            color="primary"
            checked={seletecUserIsAdmin}
            onChange={handleSwitchChange}/>}
        />
      </div>
      <Button className='button-danger' onClick={() => setShowConfirmation(true)}>delete user</Button>
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
