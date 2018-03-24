import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { stringify } from 'querystring'
import {
  getPreviousListingParams,
  getNextListingParams
} from '../util/listings'

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

  get previousUrl () {
    return stringify(
      getPreviousListingParams(this.props.listingParams, this.state.listing)
    )
  }

  get nextUrl () {
    return stringify(
      getNextListingParams(this.props.listingParams, this.state.listing)
    )
  }

  render () {
    if (this.isLoading) {
      return <div>Loading</div>
    }

    return (
      <div>
        <ul>
          {this.state.listing.children.map(({ data }) => (
            <li key={data.id}>
              <div>{data.title}</div>
              <div>{data.author} - {data.subreddit_name_prefixed}</div>
              <hr />
            </li>
          ))}
        </ul>
        <div>
          {this.state.listing.before !== null
            ? <Link to={`/?${this.previousUrl}`}>Previous</Link>
            : null}

          <Link to={`/?${this.nextUrl}`}>
            Next
          </Link>
        </div>
      </div>
    )
  }
}
