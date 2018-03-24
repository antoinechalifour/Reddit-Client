import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Markdown from 'react-remarkable'

export default function SubredditDescription ({ data }) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Description>
        <Markdown>{data.description}</Markdown>
      </Description>
    </Container>
  )
}

SubredditDescription.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
}

const Container = styled.div`
  padding: 12px;
`

const Title = styled.h2`
  text-transform: uppercase;
  font-family: var(--typography-title);
`

const Description = styled.div`
  font-size: 85%;
  opacity: .75;

  p, ul, ol {
    margin: 6px 0;
  }

  ol, ul {
    margin-left: 16px;
  }

  ol {
    list-style-type: decimal;
  }

  ul {
    list-style-type: disc;
  }
`
