import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import highlight from 'highlight.js'
import Markdown from 'react-remarkable'
import decodeHtmlEntities from 'decode-html'

export default class UserContent extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  }

  onRef = e => {
    if (!e) {
      return
    }

    const codes = [...e.querySelectorAll('pre code')]

    codes.forEach(code => highlight.highlightBlock(code))
  }

  render () {
    return (
      <Container innerRef={this.onRef} className={this.props.className}>
        <Markdown>{decodeHtmlEntities(this.props.children)}</Markdown>
      </Container>
    )
  }
}

const Container = styled.div`
  p, ul, ol {
    margin: 12px 0;
  }

  ol {
    list-style-type: disc;
  }

  ul {
    list-style-type: decimal;
  }
  
  ol, ul {
    padding-left: 22px;
  }

  code {
    font-family: monospace;
    font-size: 14px;
  }
`
