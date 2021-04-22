import React, { useEffect, useContext } from 'react'
import { Header } from './Header/Header'
import { UserManagement } from './UserManagement/UserManagement'
import { SearchUser } from './SearchUser/SearchUser'
import { Context as NewAccessContext } from '../context/newAccess/NewAccessContext'
import '../styles/main.scss'

export const App = () => {
  const { loadDAMInfo, loadDimensionData } = useContext(NewAccessContext)

  useEffect(() => {
    loadDAMInfo()
    loadDimensionData()
  }, [])

  return (
    <div>
      <Header />
      <SearchUser />
      <UserManagement />
    </div>
  )
}
