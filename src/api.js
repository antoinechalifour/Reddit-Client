import { stringify } from 'querystring'

function removeUndefinedValues (obj) {
  const copy = { ...obj }

  Object.keys(copy).forEach(key => {
    if (typeof copy[key] === 'undefined') {
      delete copy[key]
    }
  })

  return copy
}

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

  async function best (options = {}) {
    const response = await fetch(buildListingUrl('/best.json', options), {
      method: 'GET'
    })

    return response.json()
  }

  async function commentsByArticleId (articleId) {
    const response = await fetch(buildUrl(`/comments/${articleId}.json`))

    const [articleListing, commentsListing] = await response.json()

    return {
      article: articleListing.data.children[0],
      comments: commentsListing
    }
  }

  async function rContent (r, options = {}) {
    const response = await fetch(buildListingUrl(`/r/${r}.json`, options), {
      method: 'GET'
    })

    return response.json()
  }

  async function rHot (r, options = {}) {
    const response = await fetch(buildListingUrl(`/r/${r}/hot.json`, options), {
      method: 'GET'
    })

    return response.json()
  }

  async function rNew (r, options = {}) {
    const response = await fetch(buildListingUrl(`/r/${r}/new.json`, options), {
      method: 'GET'
    })

    return response.json()
  }

  async function rRising (r, options = {}) {
    const response = await fetch(
      buildListingUrl(`/r/${r}/rising.json`, options),
      {
        method: 'GET'
      }
    )

    return response.json()
  }

  async function rControversial (r, options = {}) {
    const response = await fetch(
      buildListingUrl(`/r/${r}/controversial.json`, options),
      {
        method: 'GET'
      }
    )

    return response.json()
  }

  async function rTop (r, options = {}) {
    const response = await fetch(buildListingUrl(`/r/${r}/top.json`, options), {
      method: 'GET'
    })

    return response.json()
  }

  async function rAbout (r) {
    const response = await fetch(buildUrl(`/r/${r}/about.json`))

    return response.json()
  }

  async function rSearch (query) {
    const options = stringify({
      nsfw: true,
      q: query
    })

    const uri = `/subreddits/search.json?${options}`
    const response = await fetch(buildUrl(uri), {
      method: 'GET'
    })

    return response.json()
  }

  async function moreChildren (linkId, commentIds) {
    const options = stringify({
      api_type: 'json',
      link_id: linkId,
      children: commentIds.join(',')
    })
    const response = await fetch(buildUrl(`/api/morechildren.json?${options}`))

    return response.json()
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
