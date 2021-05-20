import React, { useContext, Fragment } from 'react'
import { Context as UserContext } from '../../context/user/UserContext'
import { Header } from '../Header/Header'
import { UserManagement } from '../UserManagement/UserManagement'
import { SearchUser } from '../SearchUser/SearchUser'
import Button from '@material-ui/core/Button';
import { NewUserForm } from '../NewUserForm/NewUserForm'
import { NotAdmin } from '../NotAdmin/NotAdmin'

export const ContentWrapper = ({toggleNewUserForm, showNewUserForm}) => {
  const { state: { userIsAdmin, userDetails } } = useContext(UserContext)

  return (
    <Fragment>
      {userIsAdmin ?
        <div className='dac-library'>
          <Header/>
          <SearchUser/>
          <Button
            variant="contained"
            className='button-main'
            onClick={toggleNewUserForm}>
            {
              !showNewUserForm ? 'Add user' : 'Cancel'
            }
          </Button>
          {
            showNewUserForm && !userDetails ? <NewUserForm toggleNewUserForm={toggleNewUserForm}/> : <UserManagement/>
          }
        </div>
        : <NotAdmin/>
      }
    </Fragment>
  )
}
