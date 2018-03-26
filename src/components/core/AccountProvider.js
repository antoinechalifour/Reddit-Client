import React, { Component } from 'react'
import AccountContext from './AccountContext'

export default class AccountProvider extends Component {
  constructor (props) {
    super(props)

    const accessToken = localStorage.getItem('accessToken', null)
    const refreshToken = localStorage.getItem('refreshToken', null)

    this.state = {
      accessToken,
      refreshToken
    }
  }

  render () {
    return (
      <AccountContext.Provider
        value={{
          accessToken: this.state.accessToken,
          refreshToken: this.state.refreshToken,
          setAccessToken: token => this.setState({ accessToken: token }),
          setRefreshToken: token => this.setState({ refreshToken: token })
        }}
      >
        {this.props.children}
      </AccountContext.Provider>
    )
  }
}
