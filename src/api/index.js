import { stringify } from 'querystring'
import HttpClient from 'api/HttpClient'
import AddCredentialsMiddleware from 'api/middlewares/addCredentials'
import BuildUrlMiddleware from 'api/middlewares/buildUrl'
import CacheMiddleware from 'api/middlewares/cache'
import RetryMiddleware from 'api/middlewares/retry'

function removeUndefinedValues (obj) {
  const copy = { ...obj }

  Object.keys(copy).forEach(key => {
    if (typeof copy[key] === 'undefined') {
      delete copy[key]
    }
  })

  return copy
}

function buildListingQuerystring ({ after, before, count = 0, limit = 25 }) {
  return stringify(
    removeUndefinedValues({
      after,
      before,
      count,
      limit
    })
  )
}

export default function Api ({ clientId, clientSecret, redirectUri, auth }) {
  const api = {}
  const http = HttpClient()
  const basicAuth = `Basic ${window.btoa(`${clientId}:${''}`)}`

  http.addMiddleware(RetryMiddleware({ auth, api }))
  http.addMiddleware(BuildUrlMiddleware({ auth }))
  http.addMiddleware(CacheMiddleware())
  http.addMiddleware(AddCredentialsMiddleware({ auth }))

  api.listings = {}
  api.listings.best = (listingParams = {}) =>
    http
      .request(`/best.json?${buildListingQuerystring(listingParams)}`, {
        method: 'GET'
      })
      .then(res => res.json())

  api.listings.comments = articleId =>
    http
      .request(`/comments/${articleId}.json`, {
        method: 'GET'
      })
      .then(res => res.json())

  api.listings.hot = (r, listingParams = {}) =>
    http
      .request(`/r/${r}/hot.json?${buildListingQuerystring(listingParams)}`, {
        method: 'GET'
      })
      .then(res => res.json())

  api.listings.new = (r, listingParams = {}) =>
    http
      .request(`/r/${r}/new.json?${buildListingQuerystring(listingParams)}`, {
        method: 'GET'
      })
      .then(res => res.json())

  api.listings.rising = (r, listingParams = {}) =>
    http
      .request(
        `/r/${r}/rising.json?${buildListingQuerystring(listingParams)}`,
      {
        method: 'GET'
      }
      )
      .then(res => res.json())

  api.listings.controversial = (r, listingParams = {}) =>
    http
      .request(
        `/r/${r}/controversial.json?${buildListingQuerystring(listingParams)}`,
      {
        method: 'GET'
      }
      )
      .then(res => res.json())

  api.listings.top = (r, listingParams = {}) =>
    http
      .request(`/r/${r}/top.json?${buildListingQuerystring(listingParams)}`, {
        method: 'GET'
      })
      .then(res => res.json())

  api.subreddits = {}
  api.subreddits.about = r =>
    http
      .request(`/r/${r}/about.json`, {
        method: 'GET'
      })
      .then(res => res.json())

  api.subreddits.search = query => {
    const options = stringify({
      nsfw: true,
      q: query
    })

    return http
      .request(`/subreddits/search.json?${options}`, {
        method: 'GET'
      })
      .then(res => res.json())
  }

  api.links = {}
  api.links.moreChildren = (linkId, commentIds) => {
    const options = stringify({
      api_type: 'json',
      link_id: linkId,
      children: commentIds.join(',')
    })

    return http
      .request(`/api/morechildren.json?${options}`, {
        method: 'GET'
      })
      .then(res => res.json())
  }

  api.account = {}
  api.account.me = () =>
    http.request('/api/v1/me', { method: 'GET' }).then(res => res.json())

  api.oauth = {}
  api.oauth.refresh = async () => {
    const headers = {
      Authorization: basicAuth
    }
    const form = new FormData()
    form.append('grant_type', 'refresh_token')
    form.append('refresh_token', auth.refreshToken)

    const response = await http.rawRequest(
      'https://www.reddit.com/api/v1/access_token',
      {
        method: 'POST',
        headers,
        body: form
      }
    )
    const body = await response.json()
    auth.accessToken = body.access_token
  }

  api.oauth.getTokenFromCode = async code => {
    const headers = {
      Authorization: basicAuth
    }
    const form = new FormData()

    form.append('grant_type', 'authorization_code')
    form.append('code', code)
    form.append('redirect_uri', redirectUri)

    const response = await http.rawRequest(
      'https://www.reddit.com/api/v1/access_token',
      {
        method: 'POST',
        headers,
        body: form
      }
    )
    const body = await response.json()

    auth.accessToken = body.access_token
    auth.refreshToken = body.refresh_token
  }

  return api
}
