import Debug from 'debug'

const debug = Debug('app/http/mw/retry')

export default function RetryMiddleware ({ auth, api }) {
  return next => async requestOptions => {
    try {
      const response = await next(requestOptions)
      return response
    } catch (err) {
      if (err.response && err.response.status !== 401) {
        throw err
      }

      await api.oauth.refresh()
      return next(requestOptions)
    }
  }
}
