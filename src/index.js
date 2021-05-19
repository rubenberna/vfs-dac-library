import React from 'react'
import PropTypes from 'prop-types'
import { App } from './components/App'
import { ContextWrapper } from './components/ContextWrapper'

const Component = ({ state }) => {
  return <ContextWrapper><App /></ContextWrapper>
}

const metadata = {
  title: 'Github finder',
  requiredPermissions: ['Admin', 'Super.Admin'],
  description: 'A tiny app to search for Github profiles',
  libraryPath: '@data-portal/app-one',
  icon: 'mdi-arrow-right'
}

export { Component as default, metadata }

App.propTypes = {
  state: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    token: PropTypes.string,
    username: PropTypes.string,
    role: PropTypes.string,
    errorMessage: PropTypes.string
  })
}