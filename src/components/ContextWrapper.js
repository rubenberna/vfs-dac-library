import React from 'react';
import { Provider as UserProvider } from '../context/user/UserContext'
import { Provider as NewAccessProvider } from '../context/newAccess/NewAccessContext'

export const ContextWrapper = ({ children }) => {
  return (
      <NewAccessProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </NewAccessProvider>
  )
}
