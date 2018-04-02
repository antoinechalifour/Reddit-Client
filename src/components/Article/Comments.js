import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import HintText from 'components/core/HintText'
import CommentWrapper from 'components/Article/CommentWrapper'

export default function Comments ({ linkId, data }) {
  return (
    <Container>
      {data.children.length > 0
        ? data.children.map(({ data }) => (
          <li key={data.id}>
            <CommentWrapper {...data} linkId={linkId} />
          </li>
          ))
        : <HintText>No comments</HintText>}
    </Container>
  )
}

Comments.propTypes = {
  linkId: PropTypes.string.isRequired,
  data: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.oneOfType([
          PropTypes.shape({
            author: PropTypes.string.isRequired,
            created_utc: PropTypes.number.isRequired,
            body: PropTypes.string.isRequired
          }),
          PropTypes.shape({
            children: PropTypes.arrayOf(PropTypes.string).isRequired,
            count: PropTypes.number.isRequired
          })
        ]).isRequired
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
