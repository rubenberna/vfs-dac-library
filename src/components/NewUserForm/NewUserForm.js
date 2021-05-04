import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import { Loader } from '../_common/Loader'
import { useInput } from '../../hooks/useInput'
import { createUser } from '../../api/dac.api'
import { validateEmailRegex } from '../../utils/newUser.util'
import { IconCancel } from '../../assets/images/iconCancel'
import IconButton from '@material-ui/core/IconButton'

export const NewUserForm = ({ toggleForm }) => {
  const [errors, setErrors] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [USER_NAME, { handleInputChange: changeName, resetInput: resetName }] = useInput()
  const [USER_EMAIL, { handleInputChange: changeEmail, resetInput: resetEmail }] = useInput()
  const [USER_ACCOUNT_ID, { handleInputChange: changeAccountId, resetInput: resetAccountId }] = useInput()

  const fieldHasError = key => errors.includes(key)
  const clearFieldError = key => setErrors(errors.filter(e => e !== key))
  const validateEmail = inputValue => {
    const emailIsValid = validateEmailRegex(inputValue)
    if (!emailIsValid && errors.indexOf('USER_EMAIL') < 0) {
      const listOfErrors = [...errors, 'USER_EMAIL']
      setErrors(listOfErrors)
    }
  }

  const textFieldsProps = [
    {
      label: 'Last and First Name',
      value: USER_NAME,
      onChange: changeName,
      error: fieldHasError('USER_NAME'),
      onFocus: () => clearFieldError('USER_NAME')
    },{
      label: 'Email',
      value: USER_EMAIL,
      onChange: changeEmail,
      onBlur: (event) => validateEmail(event.target.value),
      error: fieldHasError('USER_EMAIL'),
      helperText: fieldHasError('USER_EMAIL') && "Incorrect email format",
      onFocus: () => clearFieldError('USER_EMAIL')
    },{
      label: 'Windows account',
      value: USER_ACCOUNT_ID,
      onChange: changeAccountId,
      error: fieldHasError('USER_ACCOUNT_ID'),
      onFocus: () => clearFieldError('USER_ACCOUNT_ID')
    },
  ]

  const areAllFieldsValid = (newUser) => {
    const fieldsMissing = Object.values(newUser).some(field => !field)
    if (!fieldsMissing && !errors.length && validateEmailRegex(newUser.USER_EMAIL)) {
      return true
    } else {
      createErrors(newUser)
      setMessage({
        type: 'error',
        text: 'Field inputs are invalid'
      })
      return false
    }
  }

  const clearErrorsAndMessage = () => {
    setErrors([])
    setMessage(null)
  }

  const createErrors = (newUser) => {
    let errorsList = []
    Object.entries(newUser).map(([key, value]) => {
      if (!value) {
        errorsList = [...errorsList, key]
      }
    })
    setErrors(errorsList)
  }

  const saveUser = async (newUser) => {
    setIsLoading(true)
    try {
      await createUser(newUser)
      setIsLoading(false)
      setMessage({
        type: 'success',
        text: 'Saved!'
      })
      setTimeout(() => toggleForm(), 2000)
    } catch (e) {
      console.log(e)
      setIsLoading(false)
      setMessage({
        type: 'error',
        text: 'Something went wrong'
      })
    }
  }

  const handleSave = () => {
    const newUser = {
      USER_NAME,
      USER_EMAIL,
      USER_ACCOUNT_ID
    }
    if (areAllFieldsValid(newUser))  {
      return saveUser(newUser)
    }
  }

  const renderActionComponent = () => {
    if (isLoading) return <Loader isLoading={isLoading}/>
    if (!isLoading && message && message.type === 'error' && !!errors.length) return <span className={`new-user-form__action-component--${message.type}`}>{message.text}</span>
    if (!isLoading && message && message.type === 'success' && !errors.length) return <span className={`new-user-form__action-component--${message.type}`}>{message.text}</span>
    return <Button variant="outlined" type="submit" onClick={handleSave}>Save</Button>
  }

  return (
    <Paper className="new-user-form">
      <div>
        <h3 className="new-user-form__title heading-secondary">New user</h3>
        <Grid className="new-user-form__group" container spacing={6}>
          {textFieldsProps.map((fieldProps, idx) => (
            <Grid item key={idx}>
              <TextField variant="standard" {...fieldProps} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="new-user-form__action-component u-flex u-align-items--center">
        { renderActionComponent() }
        { !!errors.length && message && message.type === 'error' &&
          <IconButton className="cancel-button" onClick={clearErrorsAndMessage}>
            <IconCancel width={17}/>
          </IconButton>
        }
      </div>
    </Paper>
  )
}
