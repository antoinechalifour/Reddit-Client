import 'reset.css/reset.css'
import 'highlight.js/styles/tomorrow-night.css'
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import Auth from './api/Auth'
import Api from 'api'

const debug = process.env.NODE_ENV === 'production' ? null : 'app/*'
window.localStorage.setItem('debug', debug)

const auth = new Auth()
const api = Api({
  clientId: process.env.REACT_APP_API_CLIENT_ID,
  clientSecret: process.env.REACT_APP_API_CLIENT_SECRET,
  redirectUri: process.env.REACT_APP_API_REDIRECT_URI,
  auth
})

function bootstrap () {
  ReactDOM.render(
    <App api={api} auth={auth} />,
    document.getElementById('root')
  )
  registerServiceWorker()

  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default

      ReactDOM.render(
        <NextApp api={api} auth={auth} />,
        document.getElementById('root')
      )
    })
  }
}

if (auth.refreshToken) {
  api.oauth.refresh().then(bootstrap).catch(bootstrap)
} else {
  bootstrap()
}
