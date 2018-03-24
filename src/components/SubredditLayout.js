import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function SubredditLayout ({ renderHeader, renderContent }) {
  return (
    <Container>
      <HeaderContainer>
        {renderHeader()}
      </HeaderContainer>
      <Body>
        <ContentContainer>
          {renderContent()}
        </ContentContainer>
      </Body>
    </Container>
  )
}

SubredditLayout.propTypes = {
  renderHeader: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired
}

const Container = styled.div`
  background: #f7f7f9;
  min-height: 100vh;
`

const HeaderContainer = styled.div``

const Body = styled.div`
  box-shadow: 0 1px 12px rgba(0, 0, 0, .2);
`

const ContentContainer = styled.main`
  width: 98%;
  max-width: 960px;
  margin: auto;
  background: #fff;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .15);
  border-radius: 2px;
  position: relative;
  top: -32px;
`
