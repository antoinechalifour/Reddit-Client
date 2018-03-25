import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import ArticleLayout from '../components/ArticleLayout'
import Header from '../components/Header'
import ArticleDetails from '../components/ArticleDetails'
import ArticleComments from '../components/ArticleComments'

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
    return this.state.article === null || this.state.comments === null
  }

  render () {
    if (this.isLoading) {
      return <div>Loading...</div>
    }

    const article = this.state.article
    const comments = this.state.comments

    return (
      <ArticleLayout
        renderHeader={() => <Header title={`/r/${article.data.subreddit}`} />}
        renderArticle={() => (
          <Fragment>
            <ArticleDetails {...article} />
            <ArticleComments {...comments} linkId={article.data.name} />
          </Fragment>
        )}
      />
    )
  }
}
