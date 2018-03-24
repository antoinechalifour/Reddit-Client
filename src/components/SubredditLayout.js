import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function SubredditLayout ({
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

SubredditLayout.propTypes = {
  renderHeader: PropTypes.func.isRequired,
  renderContent: PropTypes.func.isRequired
}

const Container = styled.div`
  background: #f7f7f9;
  min-height: 100vh;
  display: grid;
  grid-template-areas:
    "header header header"
    "content content right";
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 16px;
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

  > * + * {
    padding-top: 12px;
    margin-top: 12px;
    border-top: 1px solid rgba(0, 0, 0, .1);
  }
`

const RightSidebarContainer = styled.div`
  grid-area: right;
  padding: 16px;
`
