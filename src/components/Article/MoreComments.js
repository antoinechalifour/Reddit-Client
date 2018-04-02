import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CommentWrapper from 'components/Article/CommentWrapper'

export default class MoreComments extends Component {
  static propTypes = {
    commentIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    linkId: PropTypes.string.isRequired,
    api: PropTypes.shape({
      links: PropTypes.shape({
        moreChildren: PropTypes.func.isRequired
      }).isRequired
    }).isRequired
  }

  state = {
    more: null
  }

  loadMore = async () => {
    const things = []
    let BATCH_SIZE = 50
    const iterations = Math.ceil(this.props.commentIds.length / BATCH_SIZE)

    for (let i = 0; i < iterations; i += 1) {
      const batch = await this.props.api.links.moreChildren(
        this.props.linkId,
        this.props.commentIds.slice(i * BATCH_SIZE, i * BATCH_SIZE + BATCH_SIZE)
      )

      things.push(...batch.json.data.things)
    }

    this.setState({
      more: things
    })
  }

  render () {
    if (!this.state.more) {
      return <LoadMore onClick={this.loadMore}>Load more comments</LoadMore>
    }

    return (
      <Fragment>
        {this.state.more.map(({ data }) => (
          <CommentWrapper key={data.id} {...data} linkId={this.props.linkId} />
        ))}
      </Fragment>
    )
  }
}

const LoadMore = styled.button`
  cursor: pointer;
  border: none;
  font-family: inherit;
  font-size: 80%;
  background: #f7f7f9;
  display: block;
  width: 100%;
  padding: 6px 8px;
  margin: 12px 0;
  outline: none;
`
