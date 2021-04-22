import React, { useContext } from 'react'
import { useInput } from '../../../hooks/useInput'
import { RegularAutocomplete } from '../../_common/RegularAutocomplete'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { IconConfirm } from '../../../assets/images/iconConfirm'
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { Context as NewAccessContext } from '../../../context/newAccess/NewAccessContext'

export const UserManagementBoardNewAccess = () => {
  const { state: { options } } = useContext(NewAccessContext)
  const [dam, { handleInputChange: changeDam }] = useInput()
  const [dimOne, { handleInputChange: changeDimOne }] = useInput()
  const [dimTwo, { handleInputChange: changeDimTwo }] = useInput()
  const [dimThree, { handleInputChange: changeDimThree }] = useInput()

  const createOptions = (value, label, description) => ({
    value, label, description
  })

  const newAccessesOptions = [
    {
      val: dam,
      handleChange: changeDam,
      items: options.damInfo.map(item => createOptions(item.DAM_TK, item.DAM_NAME, item.DAM_DESCRIPTION)),
    },
    {
      val: dimOne,
      handleChange: changeDimOne,
      items: options.dimension1.map(item => createOptions(item.DIMENSION_VALUE_TK, item.DIMENSION_VALUE_NAME, item.DIMENSION_DESCRIPTION)),
    },
    {
      val: dimTwo,
      handleChange: changeDimTwo,
      items: options.dimension2.map(item => createOptions(item.DIMENSION_VALUE_TK, item.DIMENSION_VALUE_NAME, item.DIMENSION_DESCRIPTION)),
    },
    {
      val: dimThree,
      handleChange: changeDimThree,
      items: options.dimension3.map(item => createOptions(item.DIMENSION_VALUE_TK, item.DIMENSION_VALUE_NAME, item.DIMENSION_DESCRIPTION)),
    }
  ]

  return (
    <TableRow className="user-management__container--board__new-access">
      <TableCell>
        <Tooltip title='Confirm'>
          <IconButton className='action-button'>
            <IconConfirm/>
          </IconButton>
        </Tooltip>
       </TableCell>
      {newAccessesOptions.map((option, idx) => (
        <TableCell key={idx}>
          <RegularAutocomplete
            options={option.items}
            handleChange={option.handleChange}
            value={option.val}
            labelName={option.labelName}
          />
        </TableCell>
      ))}
    </TableRow>
  )
}
