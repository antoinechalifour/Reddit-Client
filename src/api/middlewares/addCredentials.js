import Debug from 'debug'

const debug = Debug('app/http/mw/addCredentials')

export default function AddCredentialsMiddleware ({ auth }) {
  return next => async requestOptions => {
    if (auth.accessToken) {
      requestOptions.request.headers = requestOptions.request.headers || {}
      requestOptions.request.headers.Authorization = `Bearer ${auth.accessToken}`

      debug(
        `Adding credentials %s for request %s`,
        requestOptions.request.headers.Authorization,
        requestOptions.url
      )
    } else {
      debug('No credentials for request %s', requestOptions.url)
    }

    return next(requestOptions)
  }
}
