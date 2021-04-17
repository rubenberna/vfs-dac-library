import React, { useState, Fragment } from 'react'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { getUser } from '../../api/dac.api'
import 'react-bootstrap-typeahead/css/Typeahead.css'

export const SearchUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState([])

  const handleSearch = async (query) => {
    setIsLoading(true)
    try {
      const { data } = await getUser(query)
      setOptions(data?.map((user) => ({ label: user.USER_NAME })))
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      console.log(e)
    }
  }

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true

  return (
    <AsyncTypeahead
      filterBy={filterBy}
      id='async-example'
      isLoading={isLoading}
      labelKey='label'
      minLength={3}
      onSearch={handleSearch}
      options={options}
      placeholder='Search by name...'
      renderMenuItemChildren={(option, props) => (
        <Fragment>
          <span>{option.label}</span>
        </Fragment>
      )}
    />
  )
}
