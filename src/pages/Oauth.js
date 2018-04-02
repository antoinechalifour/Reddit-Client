import { Component } from 'react'
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
    await this.props.api.oauth.getTokenFromCode(this.props.code)

    this.props.history.push('/')
  }

  render () {
    return null
  }
}

export default withRouter(OauthPage)
