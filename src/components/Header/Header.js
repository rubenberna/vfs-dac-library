import React from 'react'
import { LayoutBlob } from '../../assets/images/layoutBlob'
import { SearchUser } from '../SearchUser/SearchUser'

export const Header = () => {
  return (
    <div>
      <LayoutBlob />
      <div className='header'>
        <h2 className='header__title'>Let's give access</h2>
        <h3 className='header__sub-title'>
          Who would you like to give access to?
        </h3>
        <SearchUser />
      </div>
    </div>
  )
}
