import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import Header from 'components/core/Header'
import ListingPagination from 'components/core/ListingPagination'
import Layout from 'components/Subreddit/Layout'
import List from 'components/Subreddit/List'

export default class HomePage extends Component {
  static propTypes = {
    api: PropTypes.shape({
      listings: PropTypes.shape({
        best: PropTypes.func.isRequired
      }).isRequired
    }).isRequired,
    listingParams: PropTypes.shape({
      before: PropTypes.string,
      after: PropTypes.string,
      count: PropTypes.number
    }).isRequired
  }

  state = {
    listing: null
  }

  componentDidMount () {
    this.syncListing(this.props.listingParams)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.listingParams !== this.props.listingParams) {
      this.syncListing(this.props.listingParams)
    }
  }

  async syncListing ({ before, after, count } = {}) {
    const { data } = await this.props.api.listings.best({
      before,
      after,
      count
    })

    this.setState({ listing: data }, () => window.scrollTo(0, 0))
  }

  get isLoading () {
    return this.state.listing === null
  }

  render () {
    if (this.isLoading) {
      return <div>Loading</div>
    }

    return (
      <Layout
        renderHeader={() => <Header title='Welcome to Reddit' />}
        renderContent={() => (
          <Fragment>
            <ListingPagination
              listing={this.state.listing}
              listingParams={this.props.listingParams}
            />
            <List listing={this.state.listing} />
            <ListingPagination
              listing={this.state.listing}
              listingParams={this.props.listingParams}
            />
          </Fragment>
        )}
        renderRightSidebar={() => null}
      />
    )
  }
}
