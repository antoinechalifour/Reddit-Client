import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class OauthPage extends Component {
  static propTypes = {
    api: PropTypes.shape({
      oauth: PropTypes.shape({
        getTokenFromCode: PropTypes.func.isRequired
      }).isRequired
    }).isRequired,
    code: PropTypes.string.isRequired,
    account: PropTypes.shape({
      setAccessToken: PropTypes.func.isRequired,
      setRefreshToken: PropTypes.func.isRequired
    }).isRequired
  }

  async componentDidMount () {
    const {
      access_token: accessToken,
      refresh_token: refreshToken
    } = await this.props.api.oauth.getTokenFromCode(
      'GDObwCGoh5qWdg',
      this.props.code,
      'http://localhost:3000/oauth'
    )

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)

    this.props.account.setAccessToken(accessToken)
    this.props.account.setRefreshToken(refreshToken)

    this.props.history.push('/')
  }

  render () {
    return null
  }
}

export default withRouter(OauthPage)
