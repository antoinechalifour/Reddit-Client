import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import AccountIcon from 'react-icons/lib/md/account-circle'
import LogoutIcon from 'react-icons/lib/md/exit-to-app'
import UserName from 'components/core/UserName'

export default class AccountSummary extends Component {
  static propTypes = {
    api: PropTypes.shape({
      account: PropTypes.shape({
        me: PropTypes.func.isRequired
      }).isRequired
    }).isRequired,
    account: PropTypes.shape({
      setRefreshToken: PropTypes.func.isRequired
    })
  }

  state = {}

  async componentDidMount () {
    this.setState({
      user: await this.props.api.account.me()
    })
  }

  logout = () => {
    this.props.account.setAccessToken(null)
    this.props.account.setRefreshToken(null)
  }

  render () {
    return (
      <Container>
        <AccountIcon />
        {this.state.user
          ? <Summary>
            <Row>
              <img src={this.state.user.icon_img} />
              <UserName>{this.state.user.name}</UserName>
            </Row>
            <Row>
              <LogoutIcon />
              <Clickable role='button' onClick={this.logout}>
                  Logout
                </Clickable>
            </Row>
          </Summary>
          : null}
      </Container>
    )
  }
}

const Summary = styled.div`
  padding: 12px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .2);
  display: none;
  position: absolute;
  top: 165%;
  right: 0;
  color: #373d3f;
  min-width: 250px;
  z-index: 10;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -20px;
    right: 0;
    border-color: transparent transparent #fff transparent;
    border-style: solid;
    border-width: 10px;
  }
`

const Container = styled.div`
  position: relative;
  
  svg {
    cursor: pointer;
    font-size: 26px;
  }

  &:hover ${Summary} {
    display: block;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;

  img {
    width: 22px;
    height: 22px;
    object-fit: cover;
    margin-right: 12px;
    border-radius: 50%;
  }

  svg {
    font-size: 22px;
    margin-right: 12px;
    opacity: .5;
  }

  + div {
    border-top: 1px solid rgba(0, 0, 0, .1);
  }
`

const Clickable = styled.span`
  cursor: pointer;
`
