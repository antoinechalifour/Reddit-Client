import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ArticleComment from './ArticleComment'

export default function ArticleComments ({ data }) {
  return (
    <Container>
      {data.children.map(({ data }) => (
        <li key={data.id}>
          <ArticleComment {...data} />
        </li>
      ))}
    </Container>
  )
}

ArticleComments.propTypes = {
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
`
