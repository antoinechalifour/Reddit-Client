import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import ListingPagination from 'components/core/ListingPagination'
import Loader from 'components/core/Loader'
import List from 'components/Subreddit/List'

export default class Filter extends Component {
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
    const method = this.props.api.listings[this.props.filter]
      ? this.props.filter
      : 'hot'
    const { data } = await this.props.api.listings[method](
      this.props.r,
      this.props.listingParams
    )

    this.setState(
      {
        articles: data
      },
      () => window.scrollTo(0, 0)
    )
  }

  render () {
    if (this.isLoading) {
      return <Loader />
    }

    return (
      <Fragment>
        <ListingPagination
          base={`/r/${this.props.r}/${this.props.filter}`}
          listing={this.state.articles}
          listingParams={this.props.listingParams}
        />
        <List listing={this.state.articles} />
        <ListingPagination
          base={`/r/${this.props.r}/${this.props.filter}`}
          listing={this.state.articles}
          listingParams={this.props.listingParams}
        />
      </Fragment>
    )
  }
}
