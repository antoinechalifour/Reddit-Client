import React from 'react'
import PropTypes from 'prop-types'
import formatDate from 'date-fns/format'

export default function FormattedDate ({ children, format }) {
  return <span>{formatDate(children, format)}</span>
}

FormattedDate.propTypes = {
  children: PropTypes.instanceOf(Date).isRequired,
  format: PropTypes.string
}

FormattedDate.defaultProps = {
  format: 'DD/MM/YYYY HH:mm'
}
