import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ArticleCommentWrapper from './ArticleCommentWrapper'

export default function ArticleComments ({ linkId, data }) {
  return (
    <Container>
      {data.children.map(({ data }) => (
        <li key={data.id}>
          <ArticleCommentWrapper {...data} linkId={linkId} />
        </li>
      ))}
    </Container>
  )
}

ArticleComments.propTypes = {
  linkId: PropTypes.string.isRequired,
  data: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.shape({
          author: PropTypes.string.isRequired,
          created_utc: PropTypes.number.isRequired,
          body: PropTypes.string.isRequired
        }).isRequired
      })
    ).isRequired
  })
}

const Container = styled.ul`
  margin-top: 24px;
  background: #fff;
  padding: 12px;
  border-radius: 2px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);

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
