import React from 'react'
import styled from 'styled-components'

const allTags = [
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

export default function Tags (props) {
  const tags = allTags.filter(c => props[c.attr])

  if (tags.length === 0) {
    return null
  }

  return (
    <Container>
      {tags.map(c => <Tag key={c.attr} style={c.style}>{c.label}</Tag>)}
    </Container>
  )
}

const Container = styled.ul`
  display: flex;
`

const Tag = styled.li`
  background: rgba(0, 0, 0, .24);
  font-size: 60%;
  padding: 1px 4px;
  border-radius: 2px;
  text-transform: uppercase;

  + li {
    margin-left: 8px;
  }
`
