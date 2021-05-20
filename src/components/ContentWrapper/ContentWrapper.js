import React, { useContext, Fragment } from 'react'
import { Context as UserContext } from '../../context/user/UserContext'
import { Header } from '../Header/Header'
import { UserManagement } from '../UserManagement/UserManagement'
import { SearchUser } from '../SearchUser/SearchUser'
import Button from '@material-ui/core/Button';
import { NewUserForm } from '../NewUserForm/NewUserForm'
import { NotAdmin } from '../NotAdmin/NotAdmin'

export const ContentWrapper = ({toggleForm, showNewUserForm}) => {
  const { state: { userIsAdmin } } = useContext(UserContext)

  return (
    <Fragment>
      {userIsAdmin ?
        <div className='dac-library'>
          <Header/>
          <SearchUser/>
          <Button
            variant="contained"
            className='button-main'
            onClick={toggleForm}>
            {
              !showNewUserForm ? 'Add user' : 'Cancel'
            }
          </Button>
          {showNewUserForm && !userDetails && <NewUserForm toggleForm={toggleForm}/>}
          <UserManagement/>
        </div>
        : <NotAdmin/>
      }
    </Fragment>
  )
}
