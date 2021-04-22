import React from 'react'
import { App } from './components/App'
import { ContextWrapper } from './components/ContextWrapper'

export const MainComponent = () => {
  return <ContextWrapper><App /></ContextWrapper>
}
