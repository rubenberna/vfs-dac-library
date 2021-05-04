import React, { useContext, useEffect, useState } from 'react'
import { RegularAutocomplete } from '../../_common/RegularAutocomplete'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { IconCancel } from '../../../assets/images/iconCancel'
import IconButton from '@material-ui/core/IconButton';
import { IconConfirm } from '../../../assets/images/iconConfirm'
import { Context as NewAccessContext } from '../../../context/newAccess/NewAccessContext'
import { Context as UserContext } from '../../../context/user/UserContext'
import { useSpring, animated, config } from 'react-spring'
import {
  getDefaultValue,
  createNewAccessOptionsFields,
  createNewAccessOptionsList
} from '../../../utils/newAccess.utils'

export const UserManagementBoardNewAccess = ({ handleAnimation }) => {
  const { state: { options, newAccess, showNewAccessRow }, changeNewAccessValue, saveNewAccess, clearNewAccessValues, toggleNewAccessRow } = useContext(NewAccessContext)
  const { state: { userDetails }, setUserSec } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false);

  const newAccessKeys = Object.keys(newAccess).length;
  const nrOfInputValues = Object.values(newAccess).filter(item => item.value).length
  const formIsComplete = newAccessKeys === nrOfInputValues

  const fadeStyles = useSpring({
    config: { ...config.gentle },
    from: { opacity: 0 },
    to: {
      opacity: showNewAccessRow ? 1 : 0
    }
  });

  const newAccessOptionsList = createNewAccessOptionsList(options)
  console.log({newAccessOptionsList})
  const [noDefaultValueNeeded, ...itemsWithDefaultValues] = newAccessOptionsList
  const newAccessesOptions = createNewAccessOptionsFields(newAccessOptionsList, changeNewAccessValue, options, newAccess)

  const addDefaultValues = (userDetails, options, itemsWithDefaultValues) => {
    changeNewAccessValue({ USER_TK: { value: userDetails.USER_TK, label: userDetails.USER_NAME } })
    itemsWithDefaultValues.forEach(item => {
      const defaultValue = getDefaultValue(options, item.dimension)
      if (defaultValue) {
        changeNewAccessValue({ [item.property]: { value: defaultValue[item.targetValue], label: defaultValue[item.label]}})
      }
    })
  }

  useEffect(() => {
    if (userDetails && itemsWithDefaultValues) {
      addDefaultValues(userDetails, options, itemsWithDefaultValues)
    }
    return () => clearNewAccessValues()
  }, [userDetails])

  const dynamicIconColor = () => {
    if (formIsComplete) {
      return '#66B3A6'
    }
    return 'rgba(120, 184, 51, 0.2)'
  }

  const handleSave = async () => {
    if (formIsComplete) {
      console.log('yes')
      setIsLoading(true)
      await saveNewAccess(newAccess)
      await setUserSec(userDetails)
      setIsLoading(false)
      handleAnimation(true)
      toggleNewAccessRow()
    }
  }
  const AnimatedRow = animated(TableRow)

  console.log(newAccessesOptions)
  return (
    <AnimatedRow style={fadeStyles} className="user-management__container--board__paper__table__new-access">
      <TableCell className="user-management__container--board__paper__table__new-access--no-border">
        { isLoading &&
          <CircularProgress />
        }
       </TableCell>
      {newAccessesOptions.map((option, idx) => (
        <TableCell key={idx} className="user-management__container--board__paper__table__new-access--no-border">
          <RegularAutocomplete
            options={option.items}
            handleChange={option.handleChange}
            value={option.value}
          />
        </TableCell>
      ))}
      <TableCell className="user-management__container--board__paper__table__new-access--no-border u-flex u-flex__vertical">
        <Tooltip title={formIsComplete ? "Confirm" : "Still some fields missing"} placement="right" >
          <IconButton aria-label="confirm" className={formIsComplete ? 'u-cursor-pointer' : 'u-cursor-disabled'} onClick={handleSave}>
            <IconConfirm color={dynamicIconColor()}/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel" placement="right">
          <IconButton aria-label="cancel" onClick={toggleNewAccessRow}>
            <IconCancel color="#C4001A" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </AnimatedRow>
  )
}
