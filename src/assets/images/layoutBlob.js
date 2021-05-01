import React from 'react'

export const LayoutBlob = (props) => {
  return (
    <svg
      viewBox='0 0 900 600'
      width={900}
      height={600}
      xmlns='http://www.w3.org/2000/svg'
      className='layout-blob'
      {...props}
    >
      <path fill='#E1DFDD' d='M0 0h900v600H0z' />
      <path
        d='M407.223-238.243c73.4 147.1 114.5 265 84 353.6-30.6 88.7-132.7 148.1-265.8 255.2-133.1 107.1-297.2 261.9-427.8 240.2-130.6-21.8-227.7-220.1-272.8-427.6-45.1-207.4-38.2-423.9 70-578.9 108.2-155.1 317.8-248.6 475.4-207.3 157.7 41.4 263.5 217.7 337 364.8'
        fill='#202A44'
      />
    </svg>
  )
}
