import styled from 'styled-components'

const UserFormattedContent = styled.div`
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
    background: rgba(0, 0, 0, .1);
  }

  pre code {
    display: block;
    padding: 8px;
    margin: 16px 0;
  }
`

export default UserFormattedContent
