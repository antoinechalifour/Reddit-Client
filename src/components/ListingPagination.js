import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { stringify } from 'querystring'
import { Link } from 'react-router-dom'
import {
  getPreviousListingParams,
  getNextListingParams
} from '../util/listings'

export default class ListingPagination extends Component {
  static propTypes = {
    base: PropTypes.string.isRequired,
    listing: PropTypes.shape({
      before: PropTypes.string,
      after: PropTypes.string
    }).isRequired,
    listingParams: PropTypes.object.isRequired
  }

  static defaultProps = {
    base: '/'
  }

  buildUrl (q) {
    return `${this.props.base}?${stringify(q)}`
  }

  get previousUrl () {
    return this.buildUrl(
      getPreviousListingParams(this.props.listingParams, this.props.listing)
    )
  }

  get nextUrl () {
    return this.buildUrl(
      getNextListingParams(this.props.listingParams, this.props.listing)
    )
  }

  render () {
    return (
      <div>
        {this.props.listing.before !== null
          ? <Link to={this.previousUrl}>Previous</Link>
          : null}
        {this.props.listing.after !== null
          ? <Link to={this.nextUrl}>Next</Link>
          : null}
      </div>
    )
  }
}
