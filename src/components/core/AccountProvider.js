import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccountContext from './AccountContext'

export default class AccountProvider extends Component {
  static propTypes = {
    auth: PropTypes.shape({
      accessToken: PropTypes.string,
      refreshToken: PropTypes.string
    }).isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      accessToken: props.auth.accessToken,
      refreshToken: props.auth.refreshToken
    }

    this.unsubscribe = props.auth.subscribe(() => {
      this.setState({
        accessToken: props.auth.accessToken,
        refreshToken: props.auth.refreshToken
      })
    })
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  setAccessToken = token => {
    this.props.auth.accessToken = token
  }

  setRefreshToken = token => {
    this.props.auth.refreshToken = token
  }

  render () {
    return (
      <AccountContext.Provider
        value={{
          accessToken: this.state.accessToken,
          refreshToken: this.state.refreshToken,
          setAccessToken: this.setAccessToken,
          setRefreshToken: this.setRefreshToken
        }}
      >
        {this.props.children}
      </AccountContext.Provider>
    )
  }
}
