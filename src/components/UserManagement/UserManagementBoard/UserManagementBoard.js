import React, { useState } from 'react'
import { UserManagementBoardTable } from './UserManagementBoardTable'
import { IconDelete } from '../../../assets/images/iconDelete'

export const UserManagementBoard = ({ userSec, DAMInfo }) => {
  const [showNewAccess, setShowNewAccess] = useState(false)

  return (
    <div>
      <UserManagementBoardTable/>
    </div>
  )
}

import { UserManagementNewAccess } from './UserManagementNewAccess'

// <div className='user-management__container--board u-flex u-flex__vertical u-justify-content--between'>
//   <table>
//   <thead className='u-primary-color'>
//   <tr>
//   <th>Access Management</th>
// <th>Market</th>
// <th>Dealer</th>
// <th>Organization Unit</th>
// </tr>
// </thead>
// <tbody>
// {userSec?.map((access) => (
//   <tr key={access}>
//     <td>{access.DAM_NAME}</td>
//     <td>{access.DIMENSION_VALUE_NAME_1}</td>
//     <td>{access.DIMENSION_VALUE_NAME_2}</td>
//     <td>{access.DIMENSION_VALUE_NAME_3}</td>
//     <td>
//       <IconDelete />
//     </td>
//   </tr>
// ))}
// {showNewAccess && <UserManagementNewAccess DAMInfo={DAMInfo} />}
// </tbody>
// </table>
// <button
// className='button-add-access'
// onClick={() => setShowNewAccess(!showNewAccess)}
// >
// Add new access
// </button>
// </div>

