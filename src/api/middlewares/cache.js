import hash from 'object-hash'
import Debug from 'debug'

const debug = Debug('app/http/mw/cache')

export default function CacheMiddleware () {
  const cache = {}

  return next => async requestOptions => {
    const ignoreCache = requestOptions.request.method !== 'GET'

    if (ignoreCache) {
      debug(
        'Ignored cache for request %s %s',
        requestOptions.request.method,
        requestOptions.url
      )
      return next(requestOptions)
    }

    const url = requestOptions.url
    const headers = requestOptions.request.headers || {}

    const cacheKey = hash({
      url,
      ...headers
    })

    if (!cache[cacheKey]) {
      debug('Adding cached value for request %s', requestOptions.url)
      cache[cacheKey] = await next(requestOptions)
    } else {
      debug('Already in cache', requestOptions.url)
    }

    return cache[cacheKey].clone()
  }
}
