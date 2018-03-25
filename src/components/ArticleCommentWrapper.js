import React from 'react'
import ApiContext from './ApiContext'
import ArticleComment from './ArticleComment'
import ArticleMoreComments from './ArticleMoreComments'

export default function ArticleCommentWrapper (props) {
  if (Array.isArray(props.children)) {
    return (
      <ApiContext.Consumer>
        {({ api }) => (
          <ArticleMoreComments
            commentIds={props.children}
            linkId={props.linkId}
            api={api}
          />
        )}
      </ApiContext.Consumer>
    )
  }

  return <ArticleComment {...props} />
}
