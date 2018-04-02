export default class Auth {
  constructor () {
    this.access_token = null
    this.refresh_token = window.localStorage.getItem('refreshToken', null)
    this.subscribers = []
  }

  subscribe (listener) {
    this.subscribers.push(listener)

    return () =>
      (this.subscribers = this.subscribers.filter(x => x !== listener))
  }

  set accessToken (value) {
    this.access_token = value
    this.subscribers.forEach(x => x())
  }

  get accessToken () {
    return this.access_token
  }

  set refreshToken (value) {
    window.localStorage.setItem('refreshToken', value)
    this.refresh_token = value
    this.subscribers.forEach(x => x())
  }

  get refreshToken () {
    return this.refresh_token
  }
}
