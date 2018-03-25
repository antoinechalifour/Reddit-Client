import React from 'react'
import PropTypes from 'prop-types'

export default function Username ({ children }) {
  return <span>/u/{children}</span>
}

Username.propTypes = {
  children: PropTypes.string.isRequired
}
