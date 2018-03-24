import 'reset.css/reset.css'
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import Api from './api'

const api = Api()

ReactDOM.render(<App api={api} />, document.getElementById('root'))
registerServiceWorker()

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default

    ReactDOM.render(<NextApp api={api} />, document.getElementById('root'))
  })
}
