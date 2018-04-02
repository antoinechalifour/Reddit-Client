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

  logout = () => {
    this.props.auth.accessToken = null
    this.props.auth.refreshToken = null
  }

  render () {
    return (
      <AccountContext.Provider
        value={{
          isLoggedIn: !!this.state.accessToken,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AccountContext.Provider>
    )
  }
}
