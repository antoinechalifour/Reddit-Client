import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { stringify } from 'querystring'
import { Link } from 'react-router-dom'
import PreviousIcon from 'react-icons/lib/md/navigate-before'
import NextIcon from 'react-icons/lib/md/navigate-next'
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
      <Container>
        {this.props.listing.before !== null
          ? <Link to={this.previousUrl}><PreviousIcon /> Previous</Link>
          : <span />}
        {this.props.listing.after !== null
          ? <Link to={this.nextUrl}>Next <NextIcon /></Link>
          : <span />}
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    color: inherit;
    opacity: .6;
    transition: opacity .3s ease;

    :hover {
      opacity: 1;
    }
  }
`
