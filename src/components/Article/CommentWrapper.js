import React from 'react'
import ApiContext from 'components/core/ApiContext'
import Comment from 'components/Article/Comment'
import MoreComments from 'components/Article/MoreComments'

export default function CommentWrapper (props) {
  if (Array.isArray(props.children)) {
    return (
      <ApiContext.Consumer>
        {({ api }) => (
          <MoreComments
            api={api}
            commentIds={props.children}
            linkId={props.linkId}
          />
        )}
      </ApiContext.Consumer>
    )
  }

  return <Comment {...props} />
}
