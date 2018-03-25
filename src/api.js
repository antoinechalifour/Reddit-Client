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

  function buildUrl (path) {
    return `${baseUrl}${path}`
  }

  function buildListingUrl (path, { after, before, count = 0, limit = 25 }) {
    const query = stringify(
      removeUndefinedValues({ after, before, count, limit })
    )

    return `${buildUrl(path)}?${query}`
  }

  function best (options = {}) {
    return http(buildListingUrl('/best.json', options), {
      method: 'GET'
    })
  }

  async function commentsByArticleId (articleId) {
    const [articleListing, commentsListing] = await http(
      buildUrl(`/comments/${articleId}.json`)
    )

    return {
      article: articleListing.data.children[0],
      comments: commentsListing
    }
  }

  function rContent (r, options = {}) {
    return http(buildListingUrl(`/r/${r}.json`, options), {
      method: 'GET'
    })
  }

  function rHot (r, options = {}) {
    return http(buildListingUrl(`/r/${r}/hot.json`, options), {
      method: 'GET'
    })
  }

  function rNew (r, options = {}) {
    return http(buildListingUrl(`/r/${r}/new.json`, options), {
      method: 'GET'
    })
  }

  function rRising (r, options = {}) {
    return http(buildListingUrl(`/r/${r}/rising.json`, options), {
      method: 'GET'
    })
  }

  function rControversial (r, options = {}) {
    return http(buildListingUrl(`/r/${r}/controversial.json`, options), {
      method: 'GET'
    })
  }

  function rTop (r, options = {}) {
    return http(buildListingUrl(`/r/${r}/top.json`, options), {
      method: 'GET'
    })
  }

  function rAbout (r) {
    return http(buildUrl(`/r/${r}/about.json`))
  }

  function rSearch (query) {
    const options = stringify({
      nsfw: true,
      q: query
    })

    const uri = `/subreddits/search.json?${options}`
    return http(buildUrl(uri), {
      method: 'GET'
    })
  }

  function moreChildren (linkId, commentIds) {
    const options = stringify({
      api_type: 'json',
      link_id: linkId,
      children: commentIds.join(',')
    })
    return http(buildUrl(`/api/morechildren.json?${options}`))
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
    }
  }
}
