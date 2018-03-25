import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Markdown from 'react-remarkable'
import format from 'date-fns/format'
import randomColor from 'randomcolor'
import decodeHtmlEntities from 'decode-html'
import HintText from 'components/core/HintText'
import CommentWrapper from 'components/Article/CommentWrapper'
import UserContent from 'components/core/UserContent'

export default function Comment ({
  author,
  created_utc,
  body,
  depth,
  replies,
  link_id
}) {
  return (
    <Container>
      <Color seed={depth} />
      <div>
        <HintText>
          /u/{author} • {format(new Date(created_utc * 1000), 'DD/MM/YYYY')}
        </HintText>
      </div>
      <UserContent>
        <Markdown>
          {decodeHtmlEntities(body)}
        </Markdown>
      </UserContent>

      <Replies>
        {replies && replies.data
          ? replies.data.children.map(({ data }) => {
            return (
              <li key={data.id}>
                <CommentWrapper
                  {...data}
                  depth={depth + 1}
                  linkId={link_id}
                  />
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
  depth: PropTypes.number.isRequired
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
  background: ${({ depth }) => randomColor({ seed: depth })};
  opacity: .2;
`

const Replies = styled.ul`
  padding-left: 8px;
`
