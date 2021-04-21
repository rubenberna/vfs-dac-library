import React, { useState, useEffect } from 'react'
import { Header } from './Header/Header'
import { UserManagement } from './UserManagement/UserManagement'
import { SearchUser } from './SearchUser/SearchUser'
import { getUserSec, getDAMInfo } from '../api/dac.api'
import '../styles/main.scss'

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(undefined)
  const [userSec, setUserSec] = useState(undefined)
  const [DAMInfo, setDAMInfo] = useState([])

  const getAccessDetails = async (userTk) => {
    const { data } = await getUserSec(userTk)
    setUserSec(data)
  }

  const loadDAMInfo = async () => {
    const { data } = await getDAMInfo()
    setDAMInfo(data)
  }

  useEffect(() => {
    if (selectedUser) {
      getAccessDetails(selectedUser.USER_TK)
    }
  }, [selectedUser])

  useEffect(() => {
    loadDAMInfo()
  }, [])

  return (
    <div>
      <Header onSelectUser={(user) => setSelectedUser(user)} />
      <SearchUser onSelectUser={setSelectedUser} />
      <UserManagement
        selectedUser={selectedUser}
        userSec={userSec}
        DAMInfo={DAMInfo}
      />
    </div>
  )
}
