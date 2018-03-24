import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ArticleList from '../components/ArticleList'
import ListingPagination from '../components/ListingPagination'

export default class R extends Component {
  static propTypes = {
    api: PropTypes.shape({
      r: PropTypes.shape({
        r: PropTypes.func.isRequired,
        about: PropTypes.func.isRequired
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
    about: null,
    content: null
  }

  async componentDidMount () {
    this.syncListing()
    this.setState({
      about: await this.props.api.r.about(this.props.r)
    })
  }

  componentDidUpdate (prevProps) {
    if (prevProps.listingParams !== this.props.listingParams) {
      this.syncListing(this.props.listingParams)
    }
  }

  async syncListing ({ before, after, count } = {}) {
    const { data } = await this.props.api.r.r(this.props.r, {
      before,
      after,
      count
    })

    this.setState({ content: data }, () => window.scrollTo(0, 0))
  }

  get isLoading () {
    return this.state.about === null || this.state.content === null
  }

  render () {
    if (this.isLoading) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <div>Todo: header</div>
        <ArticleList listing={this.state.content} />
        <ListingPagination
          base={`/r/${this.props.r}`}
          listing={this.state.content}
          listingParams={this.props.listingParams}
        />
      </div>
    )
  }
}
