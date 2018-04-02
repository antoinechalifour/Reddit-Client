import isRelativeUrl from 'is-relative-url'
import Debug from 'debug'

const debug = Debug('app/http/mw/buildUrl')
const WWW_URL = 'https://www.reddit.com'
const OAUTH_URL = 'https://oauth.reddit.com'

export default function BuildUrlMiddleware ({ auth }) {
  return next => requestOptions => {
    const rewriteUrl = isRelativeUrl(requestOptions.url)

    if (rewriteUrl) {
      const base = auth.accessToken ? OAUTH_URL : WWW_URL

      requestOptions.url = `${base}${requestOptions.url}`

      debug('Rewrote url to %s', requestOptions.url)
    } else {
      debug('Using absolute url %s', requestOptions.url)
    }

    return next(requestOptions)
  }
}
