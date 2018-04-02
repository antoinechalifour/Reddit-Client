import { Component } from 'react'
import PropTypes from 'prop-types'

export default class LoadPage extends Component {
  static propTypes = {
    loader: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired
  }

  state = {
    data: null
  }

  componentDidMount () {
    this.fetch()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.loader !== this.props.loader) {
      this.setState({ data: null }, () => this.fetch())
    }
  }

  fetch () {
    this.props.loader().then(data => this.setState({ data }))
  }

  render () {
    return this.props.children(this.state.data)
  }
}
