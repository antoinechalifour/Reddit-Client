import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function Layout ({
  renderHeader,
  renderContent,
  renderRightSidebar
}) {
  return (
    <Container>
      <HeaderContainer>
        {renderHeader()}
      </HeaderContainer>
      <ContentContainer>
        {renderContent()}
      </ContentContainer>
      <RightSidebarContainer>
        {renderRightSidebar()}
      </RightSidebarContainer>
    </Container>
  )
}

Layout.propTypes = {
  renderHeader: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired
}

const Container = styled.div`
  background: #f7f7f9;
  min-height: 100vh;
  display: grid;
  padding: 16px;
  grid-template-areas:
    "header"
    "content"
    "right";
  grid-template-rows: auto;
  grid-template-columns: auto;

  @media (min-width: 1000px) {
    grid-template-areas:
      "header header header"
      "content content right";
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr 1fr 1fr;
  }
`

const HeaderContainer = styled.div`
  grid-area: header;
  margin-top: -16px;
  margin-left: -16px;
  margin-right: -16px;
`

const ContentContainer = styled.main`
  grid-area: content;
  background: #fff;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .15);
  border-radius: 2px;
  position: relative;
  top: -32px;

  > div + * {
    padding-top: 12px;
    margin-top: 12px;
  }
`

const RightSidebarContainer = styled.div`
  grid-area: right;
  padding: 16px;
`
