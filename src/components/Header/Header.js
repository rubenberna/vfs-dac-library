import React from 'react'
import { LayoutBlob } from '../../assets/images/layoutBlob'

export const Header = () => {
  return (
    <div>
      <LayoutBlob />
      <div className='header u-padding-big'>
        <h3 className='heading-primary'>Let's share access</h3>
        <h3 className='heading-tertiary'>
          Who would you like to give access to?
        </h3>
      </div>
    </div>
  )
}
