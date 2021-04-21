import React, { useState } from 'react'
import { AsyncAutocomplete } from '../_common/AsyncAutocomplete'
import { getUser } from '../../api/dac.api'

export const SearchUser = ({ onSelectUser }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState([])

  const handleSearch = async (query) => {
    setIsLoading(true)
    if (query) {
      try {
        const { data } = await getUser(query)
        setOptions(data?.map((user) => ({ label: user.USER_NAME, ...user })))
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        console.log(e)
      }
    }
  }

  const handleSelection = (event, value) => {
    onSelectUser(value)
  }

  return (
    <div className='u-padding-big u-flex'>
      <AsyncAutocomplete
        options={options}
        handleSelection={handleSelection}
        handleSearch={handleSearch}
        isLoading={isLoading}
      />
    </div>
  )
}
