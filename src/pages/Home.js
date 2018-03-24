import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import SubredditLayout from '../components/SubredditLayout'
import Header from '../components/Header'
import ArticleList from '../components/ArticleList'
import ListingPagination from '../components/ListingPagination'

export default class Home extends Component {
  static propTypes = {
    api: PropTypes.shape({
      best: PropTypes.func.isRequired
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
    const { data } = await this.props.api.best({ before, after, count })

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
      <SubredditLayout
        renderHeader={() => <Header title='Welcome to Reddit' />}
        renderContent={() => (
          <Fragment>
            <ArticleList listing={this.state.listing} />
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
