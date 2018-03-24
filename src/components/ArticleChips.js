import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const allChips = [
  {
    attr: 'archived',
    label: 'Archived'
  },
  {
    attr: 'edited',
    label: 'Edited',
    style: {
      background: '#03A9F4',
      color: '#fff'
    }
  },
  {
    attr: 'locked',
    label: 'Locked'
  },
  {
    attr: 'over_18',
    label: 'NSFW',
    style: {
      background: '#E91E63',
      color: '#fff'
    }
  },
  {
    attr: 'pinned',
    label: 'Pinned'
  },
  {
    attr: 'spoiler',
    label: 'Spoiler',
    style: {
      background: '#E91E63',
      color: '#fff'
    }
  },
  {
    attr: 'stickied',
    label: 'Sticky',
    style: {
      background: '#9C27B0',
      color: '#fff'
    }
  }
]

export default function ArticleChips (props) {
  const chips = allChips.filter(c => props[c.attr])

  if (chips.length === 0) {
    return null
  }

  return (
    <Container>
      {chips.map(c => <Chips key={c.attr} style={c.style}>{c.label}</Chips>)}
    </Container>
  )
}

const Container = styled.ul`
  display: flex;
`

const Chips = styled.li`
  background: rgba(0, 0, 0, .24);
  font-size: 60%;
  padding: 1px 4px;
  border-radius: 2px;
  text-transform: uppercase;

  + li {
    margin-left: 8px;
  }
`
