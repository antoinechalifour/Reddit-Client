import { stringify } from 'querystring'
import hash from 'object-hash'
import addMinutes from 'date-fns/add_minutes'
import isBefore from 'date-fns/is_before'

function removeUndefinedValues (obj) {
  const copy = { ...obj }

  Object.keys(copy).forEach(key => {
    if (typeof copy[key] === 'undefined') {
      delete copy[key]
    }
  })

  return copy
}

const createHttpClient = function () {
  const cache = {}

  return async function (url, options = {}) {
    const key = hash({ url, ...options })

    if (cache[key]) {
      const expirationDate = cache[key].expiresAt

      if (isBefore(new Date(), expirationDate)) {
        return Promise.resolve(cache[key].data)
      } else {
        delete cache[key]
      }
    }

    const response = await fetch(url, options)
    const body = await response.json()

    cache[key] = {
      data: body,
      expiresAt: addMinutes(new Date(), 15)
    }

    return body
  }
}

const http = createHttpClient()

export default function createApi () {
  const baseUrl = 'https://www.reddit.com'
  const authUrl = 'https://oauth.reddit.com'
  let accessToken

  function buildPublicUrl (path) {
    return `${baseUrl}${path}`
  }

  function buildAuthenticatedUrl (path) {
    return `${authUrl}${path}`
  }

  function buildListingUrl (path, { after, before, count = 0, limit = 25 }) {
    const query = stringify(
      removeUndefinedValues({ after, before, count, limit })
    )

    return `${buildPublicUrl(path)}?${query}`
  }

  function buildOptions (overrides = {}) {
    const headers = {}

    if (accessToken) {
      headers['Authorization'] = `bearer ${accessToken}`
    }

    return {
      headers,
      ...overrides
    }
  }

  function best (options = {}) {
    return http(buildListingUrl('/best.json', buildOptions(options)), {
      method: 'GET'
    })
  }

  async function commentsByArticleId (articleId) {
    const [articleListing, commentsListing] = await http(
      buildPublicUrl(`/comments/${articleId}.json`)
    )

    return {
      article: articleListing.data.children[0],
      comments: commentsListing
    }
  }

  function rContent (r, options = {}) {
    return http(buildListingUrl(`/r/${r}.json`, buildOptions(options)), {
      method: 'GET'
    })
  }

  function rHot (r, options = {}) {
    return http(buildListingUrl(`/r/${r}/hot.json`, buildOptions(options)), {
      method: 'GET'
    })
  }

  function rNew (r, options = {}) {
    return http(buildListingUrl(`/r/${r}/new.json`, buildOptions(options)), {
      method: 'GET'
    })
  }

  function rRising (r, options = {}) {
    return http(buildListingUrl(`/r/${r}/rising.json`, buildOptions(options)), {
      method: 'GET'
    })
  }

  function rControversial (r, options = {}) {
    return http(
      buildListingUrl(`/r/${r}/controversial.json`, buildOptions(options)),
      {
        method: 'GET'
      }
    )
  }

  function rTop (r, options = {}) {
    return http(buildListingUrl(`/r/${r}/top.json`, buildOptions(options)), {
      method: 'GET'
    })
  }

  function rAbout (r) {
    return http(buildPublicUrl(`/r/${r}/about.json`))
  }

  function rSearch (query) {
    const options = stringify({
      nsfw: true,
      q: query
    })

    const uri = `/subreddits/search.json?${options}`
    return http(buildPublicUrl(uri), {
      method: 'GET'
    })
  }

  function moreChildren (linkId, commentIds) {
    const options = stringify({
      api_type: 'json',
      link_id: linkId,
      children: commentIds.join(',')
    })
    return http(buildPublicUrl(`/api/morechildren.json?${options}`))
  }

  async function getTokenFromCode (clientId, code, redirectUri) {
    const headers = {
      Authorization: `Basic ${btoa(`${clientId}:${''}`)}`
    }
    const form = new FormData()

    form.append('grant_type', 'authorization_code')
    form.append('code', code)
    form.append('redirect_uri', redirectUri)

    const response = await fetch(buildPublicUrl('/api/v1/access_token'), {
      method: 'POST',
      headers,
      body: form
    })

    return response.json()
  }

  async function me () {
    return http(
      buildAuthenticatedUrl('/api/v1/me'),
      buildOptions({
        method: 'GET'
      })
    )
  }

  function setAccessToken (token) {
    accessToken = token
  }

  return {
    best,
    comments: {
      byArticleId: commentsByArticleId,
      moreChildren
    },
    r: {
      r: rContent,
      hot: rHot,
      new: rNew,
      rising: rRising,
      controversial: rControversial,
      top: rTop,
      about: rAbout,
      search: rSearch
    },
    oauth: {
      getTokenFromCode
    },
    user: {
      me
    },
    setAccessToken
  }
}
