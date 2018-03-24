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
  const baseUrl = 'https://api.reddit.com'

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
    const response = await fetch(buildListingUrl('/best', options), {
      method: 'GET'
    })

    return response.json()
  }

  async function commentsByArticleId (articleId) {
    const response = await fetch(buildUrl(`/comments/${articleId}`))

    const [articleListing, commentsListing] = await response.json()

    return {
      article: articleListing.data.children[0],
      comments: commentsListing
    }
  }

  return {
    best,
    comments: {
      byArticleId: commentsByArticleId
    }
  }
}
