import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import highlight from 'highlight.js/lib/highlight'
import Markdown from 'react-remarkable'
import decodeHtmlEntities from 'decode-html'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import java from 'highlight.js/lib/languages/java'
import xml from 'highlight.js/lib/languages/xml'
import python from 'highlight.js/lib/languages/python'
import php from 'highlight.js/lib/languages/php'
import rust from 'highlight.js/lib/languages/rust'
import typescript from 'highlight.js/lib/languages/typescript'
import cs from 'highlight.js/lib/languages/cs'
import cpp from 'highlight.js/lib/languages/cpp'

highlight.registerLanguage('javascript', javascript)
highlight.registerLanguage('css', css)
highlight.registerLanguage('java', java)
highlight.registerLanguage('xml', xml)
highlight.registerLanguage('python', python)
highlight.registerLanguage('php', php)
highlight.registerLanguage('rust', rust)
highlight.registerLanguage('typescript', typescript)
highlight.registerLanguage('cs', cs)
highlight.registerLanguage('cpp', cpp)

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
