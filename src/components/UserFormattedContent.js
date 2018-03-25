import React, { Component } from 'react'
import styled from 'styled-components'
import highlight from 'highlight.js'

export default class UserFormattedContent extends Component {
  componentDidUpdate () {}

  onRef = e => {
    if (!e) {
      return
    }

    const codes = [...e.querySelectorAll('pre code')]

    codes.forEach(code => highlight.highlightBlock(code))
  }

  render () {
    return <Container innerRef={this.onRef}>{this.props.children}</Container>
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
