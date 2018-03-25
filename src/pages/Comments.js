import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import format from 'date-fns/format'
import Layout from 'components/Article/Layout'
import Header from 'components/core/Header'
import Details from 'components/Article/Details'
import Comments from 'components/Article/Comments'
import Loader from 'components/core/Loader'

export default class CommentsPage extends Component {
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
    return (
      <Layout
        renderHeader={() => {
          const title = this.isLoading
            ? ''
            : `/r/${this.state.article.data.subreddit}`

          return <Header title={title} />
        }}
        renderArticle={() =>
          (this.isLoading
            ? <Loader />
            : <Fragment>
              <Details {...this.state.article} />
              <Comments
                {...this.state.comments}
                linkId={this.state.article.data.name}
                />
            </Fragment>)}
      />
    )
  }
}
