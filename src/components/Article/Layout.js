import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function Layout ({ renderHeader, renderArticle }) {
  return (
    <div>
      <div>{renderHeader()}</div>
      <ArticleContainer>{renderArticle()}</ArticleContainer>
    </div>
  )
}

Layout.propTypes = {
  renderHeader: PropTypes.func.isRequired,
  renderArticle: PropTypes.func.isRequired
}

const ArticleContainer = styled.div`
  width: 98%;
  max-width: 960px;
  margin: auto;
  position: relative;
  top: -40px;
`
