import React, { useEffect, useContext, useState } from 'react'
import { Header } from './Header/Header'
import { UserManagement } from './UserManagement/UserManagement'
import { SearchUser } from './SearchUser/SearchUser'
import { Context as NewAccessContext } from '../context/newAccess/NewAccessContext'
import { Context as UserContext } from '../context/user/UserContext'
import Button from '@material-ui/core/Button';
import { NewUserForm } from './NewUserForm/NewUserForm'
import '../styles/main.scss'

export const App = () => {
  const { loadDAMInfo, loadDimensionData } = useContext(NewAccessContext)
  const { state: { userDetails }, clearUser } = useContext(UserContext)
  const [showNewUserForm, setShowNewUserForm] = useState(false)

  const toggleForm = () => {
    if (userDetails) {
      clearUser()
    }
    setShowNewUserForm(!showNewUserForm)
  }

  useEffect(() => {
    loadDAMInfo()
    loadDimensionData()
  }, [])

  return (
    <div className='dac-library'>
      <Header />
      <SearchUser />
      <Button
        variant="contained"
        className='button-main'
        onClick={toggleForm}>
        {
          !showNewUserForm ? 'Add user' : 'Cancel'
        }
      </Button>
      { showNewUserForm && !userDetails && <NewUserForm toggleForm={toggleForm}/> }
      <UserManagement />
    </div>
  )
}
