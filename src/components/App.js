import React, { useEffect, useContext, useState, Fragment } from 'react'
import { Context as NewAccessContext } from '../context/newAccess/NewAccessContext'
import { Context as UserContext } from '../context/user/UserContext'
import { LogoLoader } from './_common/LogoLoader'
import { ContentWrapper } from './ContentWrapper/ContentWrapper'
import '../styles/main.scss'

export const App = () => {
  const { loadDAMInfo, loadDimensionData } = useContext(NewAccessContext)
  const { state: { userDetails, userIsAdmin, loading }, clearUser, login, isLoggedInUserAdmin, setLoading } = useContext(UserContext)
  const [showNewUserForm, setShowNewUserForm] = useState(false)

  const toggleNewUserForm = () => {
    if (userDetails) {
      clearUser()
    }
    setShowNewUserForm(!showNewUserForm)
  }

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      await login()
      await isLoggedInUserAdmin()
      setLoading(false)
      await Promise.all([
        loadDAMInfo(),
        loadDimensionData()
      ])
    })()
  }, [])

  return (
    <Fragment>
      { loading
        ?
        <LogoLoader/>
        :
        <ContentWrapper toggleNewUserForm={toggleNewUserForm} showNewUserForm={showNewUserForm}/>
      }
    </Fragment>
  )
}

