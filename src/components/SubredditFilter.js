import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ArticleList from './ArticleList'
import ListingPagination from './ListingPagination'
import Loader from './Loader'

export default class SubredditFilter extends Component {
  static propTypes = {
    filter: PropTypes.string.isRequired,
    api: PropTypes.shape({
      r: PropTypes.shape({
        r: PropTypes.func.isRequired,
        hot: PropTypes.func.isRequired,
        new: PropTypes.func.isRequired,
        rising: PropTypes.func.isRequired,
        controversial: PropTypes.func.isRequired,
        top: PropTypes.func.isRequired
      }).isRequired
    }).isRequired,
    r: PropTypes.string.isRequired,
    listingParams: PropTypes.shape({
      before: PropTypes.string,
      after: PropTypes.string,
      count: PropTypes.number
    }).isRequired
  }

  state = {
    articles: null
  }

  get isLoading () {
    return this.state.articles === null
  }

  componentDidMount () {
    this.syncContent()
  }

  componentDidUpdate (prevProps) {
    if (
      prevProps.r !== this.props.r ||
      prevProps.listingParams !== this.props.listingParams ||
      prevProps.filter !== this.props.filter
    ) {
      this.syncContent()
    }
  }

  async syncContent () {
    const method = this.props.api.r[this.props.filter] ? this.props.filter : 'r'
    const { data } = await this.props.api.r[method](
      this.props.r,
      this.props.listingParams
    )

    this.setState({
      articles: data
    })
  }

  render () {
    if (this.isLoading) {
      return <Loader />
    }

    return (
      <Fragment>
        <ListingPagination
          base={`/r/${this.props.r}`}
          listing={this.state.articles}
          listingParams={this.props.listingParams}
        />
        <ArticleList listing={this.state.articles} />
        <ListingPagination
          base={`/r/${this.props.r}`}
          listing={this.state.articles}
          listingParams={this.props.listingParams}
        />
      </Fragment>
    )
  }
}
