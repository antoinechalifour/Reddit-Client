import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ArticleCommentWrapper from './ArticleCommentWrapper'

export default class ArticleMoreComments extends Component {
  static propTypes = {
    commentIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    linkId: PropTypes.string.isRequired,
    api: PropTypes.shape({
      comments: PropTypes.shape({
        moreChildren: PropTypes.func.isRequired
      }).isRequired
    }).isRequired
  }

  state = {
    more: null
  }

  loadMore = async () => {
    this.setState({
      more: await this.props.api.comments.moreChildren(
        this.props.linkId,
        this.props.commentIds
      )
    })
  }

  render () {
    if (!this.state.more) {
      return <LoadMore onClick={this.loadMore}>Load more comments</LoadMore>
    }

    return (
      <Fragment>
        {this.state.more.json.data.things.map(({ data }) => (
          <ArticleCommentWrapper
            key={data.id}
            {...data}
            linkId={this.props.linkId}
          />
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
