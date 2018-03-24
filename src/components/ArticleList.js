import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function ArticleList ({ listing }) {
  return (
    <ul>
      {listing.children.map(({ data }) => (
        <li key={data.id}>
          <Link to={`/comments/${data.id}`}>{data.title}</Link>
          <div>{data.author} - {data.subreddit_name_prefixed}</div>
          <hr />
        </li>
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
          subreddit_name_prefixed: PropTypes.string.isRequired
        }).isRequired
      })
    ).isRequired
  }).isRequired
}
