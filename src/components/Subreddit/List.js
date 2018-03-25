import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import GildedIcon from 'react-icons/lib/md/star'
import decodeHtmlEntities from 'decode-html'
import SubredditName from 'components/core/SubredditName'
import UserName from 'components/core/UserName'
import FormattedDate from 'components/core/FormattedDate'
import CaptionGroup from 'components/core/CaptionGroup'
import Thumbnail from 'components/Subreddit/Thumbnail'
import Tags from 'components/Subreddit/Tags'

export default function List ({ listing }) {
  return (
    <ul>
      {listing.children.map(({ data }) => (
        <Article key={data.id}>
          <Thumbnail {...data} />
          <div>
            <div>
              <Title to={`/comments/${data.id}`}>
                {decodeHtmlEntities(data.title)}
                {data.gilded > 0
                  ? <Gilded><GildedIcon /> {data.gilded}</Gilded>
                  : null}
              </Title>
            </div>
            <Tags {...data} />
            <CaptionGroup>
              <SubredditName>{data.subreddit}</SubredditName>
              <UserName>{data.author}</UserName>
              <FormattedDate>{new Date(data.created_utc * 1000)}</FormattedDate>
              <span>{data.domain}</span>
            </CaptionGroup>

          </div>
        </Article>
      ))}
    </ul>
  )
}

List.propTypes = {
  listing: PropTypes.shape({
    children: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          author: PropTypes.string.isRequired,
          subreddit_name_prefixed: PropTypes.string.isRequired,
          created_utc: PropTypes.number.isRequired
        }).isRequired
      })
    ).isRequired
  }).isRequired
}

const Article = styled.li`
  word-break: break-all;
  padding: 12px;
  color: inherit;
  text-decoration: none;
  display: flex;

  > :last-child {
    flex: 1;
  }

  > * + * {
    margin-left: 12px;
  }
`

const Title = styled(Link)`
  text-decoration: none;
  color: inherit;
`

const Gilded = styled.span`
  color: #FFC107;
  margin-left: 12px;
  display: inline-flex;
  align-items: center;

  svg {
    margin-right: 4px;
  }
`
