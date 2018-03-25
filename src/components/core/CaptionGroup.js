import React from 'react'
import PropTypes from 'prop-types'
import HintText from 'components/core/HintText'

export default function CaptionGroup ({ children }) {
  return <Container>{children}</Container>
}

CaptionGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired
}

const Container = HintText.extend`
  > * + *::before {
    content: '•';
    margin: 0 8px;
  }
`.withComponent('div')
