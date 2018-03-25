import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import randomColor from 'randomcolor'
import UserContent from 'components/core/UserContent'
import UserName from 'components/core/UserName'
import FormattedDate from 'components/core/FormattedDate'
import CaptionGroup from 'components/core/CaptionGroup'
import CommentWrapper from 'components/Article/CommentWrapper'

export default function Comment ({
  author,
  created_utc,
  body,
  depth,
  replies,
  linkId
}) {
  return (
    <Container>
      <Color
        style={{
          background: randomColor({ seed: depth })
        }}
      />
      <CaptionGroup>
        <UserName>{author}</UserName>
        <FormattedDate>{new Date(created_utc * 1000)}</FormattedDate>
      </CaptionGroup>
      <UserContent>
        {body}
      </UserContent>

      <Replies>
        {replies && replies.data
          ? replies.data.children.map(({ data }) => {
            return (
              <li key={data.id}>
                <CommentWrapper {...data} depth={depth + 1} linkId={linkId} />
              </li>
            )
          })
          : null}
      </Replies>
    </Container>
  )
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  created_utc: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  replies: PropTypes.shape({
    data: PropTypes.shape({
      children: PropTypes.arrayOf(
        PropTypes.shape({
          data: PropTypes.object.isRequired
        })
      ).isRequired
    }).isRequired
  }).isRequired,
  depth: PropTypes.number.isRequired,
  linkId: PropTypes.string.isRequired
}

Comment.defaultProps = {
  depth: 0
}

const Container = styled.div`
  margin: 16px 0;
  position: relative;
`

const Color = styled.div`
  position: absolute;
  left: -12px;
  top: 0;
  bottom: 0;
  width: 2px;
  opacity: .2;
`

const Replies = styled.ul`
  padding-left: 8px;
`
