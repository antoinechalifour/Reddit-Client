import React, { Component } from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'

function Comment ({
  author,
  score,
  body,
  edited = false,
  stickied = false,
  created_utc,
  replies,
  depth = 0
}) {
  return (
    <div>
      <div>
        <div>Author: {author}</div>
        <div>Score: {score}</div>
        <div>Body: {body}</div>
        <div>Edited: {edited.toString()}</div>
        <div>Stickied: {stickied.toString()}</div>
        <div>
          Created at: {format(new Date(created_utc * 1000), 'DD/MM/YYYY')}
        </div>
      </div>
      <div style={{ paddingLeft: `${6 * depth}px` }}>
        <ul>
          {replies &&
            replies.data &&
            replies.data.children.map(({ data }) => (
              <li key={data.id}>
                <Comment {...data} depth={depth + 1} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default class Comments extends Component {
  static propTypes = {
    api: PropTypes.shape({
      comments: PropTypes.shape({
        byArticleId: PropTypes.func.isRequired
      }).isRequired
    }).isRequired,
    articleId: PropTypes.string.isRequired
  }

  state = {
    article: null,
    comments: null
  }

  async componentDidMount () {
    this.setState(
      await this.props.api.comments.byArticleId(this.props.articleId)
    )
  }

  get isLoading () {
    return this.state.article === null
  }

  render () {
    if (this.isLoading) {
      return <div>Loading...</div>
    }

    const article = this.state.article
    const comments = this.state.comments

    return (
      <div>
        <div>
          <h1>{article.data.title}</h1>
          <div>Author: {article.data.author}</div>
          <div>Subreddit: {article.data.subreddit_name_prefixed}</div>
          <div>
            Posted at:
            {' '}
            {format(new Date(article.data.created_utc * 1000), 'DD/MM/YYYY')}
          </div>
          <div>Score: {article.data.score}</div>
          <div>Archived: {article.data.archived.toString()}</div>
          <div>Pinned: {article.data.pinned.toString()}</div>
          <div>NSFW: {article.data.over_18.toString()}</div>
          {article.data.selftext !== ''
            ? <div>SelfText: {article.data.selftext}</div>
            : null}
          <div>
            Preview:
            {' '}
            {article.data.preview.enabled
              ? <img
                src={article.data.preview.images[0].source.url}
                style={{ width: '100%' }}
                />
              : 'None'}
          </div>
          <div>Comments: {article.data.num_comments}</div>
          <div>Edited: {article.data.edited.toString()}</div>
          <div>Gilded: {article.data.gilded.toString()}</div>
          <div>Locked: {article.data.locked.toString()}</div>
          <div>Stickied: {article.data.stickied.toString()}</div>
          <div>Spoiler: {article.data.spoiler.toString()}</div>
          <div>POST HINT: {article.data.post_hint}</div>
        </div>
        <hr />
        <div>
          <ul>
            {comments.data.children.map(({ data }) => (
              <li key={data.id}>
                <Comment {...data} />
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
