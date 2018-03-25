import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled(Link)`
  color: inherit;
  text-decoration: none;
`

export default function SubredditName ({ children }) {
  return <Container to={`/r/${children}`}>/r/{children}</Container>
}

SubredditName.propTypes = {
  children: PropTypes.string.isRequired
}
