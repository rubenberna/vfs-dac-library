import React from 'react'
import { useInput } from '../../../hooks/useInput'
import { RegularAutocomplete } from '../../_common/RegularAutocomplete'

export const UserManagementBoardNewAccess = ({ showNewAccess, DAMInfo }) => {
  const [dam, { handleInputChange: changeDam }] = useInput()
  const [dimOne, { handleInputChange: changeDimOne }] = useInput()
  const [dimTwo, { handleInputChange: changeDimTwo }] = useInput()
  const [dimThree, { handleInputChange: changeDimThree }] = useInput()

  const newAccessesOptions = [
    {
      val: dam,
      handleChange: changeDam,
      items: DAMInfo,
      labelName: 'DAM_NAME'
    },
    {
      val: dimOne,
      handleChange: changeDimOne,
      items: DAMInfo,
      labelName: 'DAM_NAME'
    },
    {
      val: dimTwo,
      handleChange: changeDimTwo,
      items: DAMInfo,
      labelName: 'DAM_NAME'
    },
    {
      val: dimThree,
      handleChange: changeDimThree,
      items: DAMInfo,
      labelName: 'DAM_NAME'
    }
  ]

  return (
    <tr>
      {newAccessesOptions.map((option, idx) => (
        <td key={idx}>
          <RegularAutocomplete
            options={option.items}
            handleChange={option.handleChange}
            value={option.val}
            labelName={option.labelName}
          />
        </td>
      ))}
      <td />
    </tr>
  )
}
