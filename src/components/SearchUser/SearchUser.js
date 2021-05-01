import React, { useState, useContext } from 'react'
import { AsyncAutocomplete } from '../_common/AsyncAutocomplete'
import { Context as UserContext } from '../../context/user/UserContext'

export const SearchUser = () => {
  const { state: { searchOptions }, setUser, setUserSec, setSearchOptions } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (query) => {
    if (query) {
      setIsLoading(true)
      await setSearchOptions(query)
      setIsLoading(false)
    }
  }

  const handleSelection = (event, value) => {
    setUser(value)
    if (value) {
      setUserSec(value)
    }
  }

  return (
    <div className='u-padding-big u-flex'>
      <AsyncAutocomplete
        options={searchOptions}
        handleSelection={handleSelection}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />
    </div>
  )
}
