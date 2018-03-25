import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import format from 'date-fns/format'
import GildedIcon from 'react-icons/lib/md/star'
import decodeHtmlEntities from 'decode-html'
import ArticleThumbnail from './ArticleThumbnail'
import ArticleChips from './ArticleChips'

export default function ArticleList ({ listing }) {
  return (
    <ul>
      {listing.children.map(({ data }) => (
        <Article key={data.id}>
          <Link to={`/comments/${data.id}`}>
            <ArticleThumbnail {...data} />
            <div>
              <div>
                {decodeHtmlEntities(data.title)}
                {data.gilded > 0
                  ? <Gilded><GildedIcon /> {data.gilded}</Gilded>
                  : null}
              </div>
              <ArticleChips {...data} />
              <Information>
                <span>/{data.subreddit_name_prefixed}</span>
                <span>/u/{data.author}</span>
                <span>
                  {format(new Date(data.created_utc * 1000), 'DD/MM/YYYY')}
                </span>
              </Information>

            </div>
          </Link>
        </Article>
      ))}
    </ul>
  )
}

ArticleList.propTypes = {
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
  a {
    padding: 12px;
    color: inherit;
    cursor: pointer;
    text-decoration: none;
    display: flex;

    > :last-child {
      flex: 1;
    }

    > * + * {
      margin-left: 12px;
    }
  }
`

const Information = styled.div`
  span {
    opacity: .5;
    font-size: 80%;
  }

  > span + span::before {
    content: '•';
    margin: 0 8px;
  }
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
