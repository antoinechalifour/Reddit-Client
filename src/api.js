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

  function buildUrl (path, { after, before, count = 0, limit = 25 }) {
    const query = stringify(
      removeUndefinedValues({ after, before, count, limit })
    )

    return `${baseUrl}${path}?${query}`
  }

  async function best (options = {}) {
    const response = await fetch(buildUrl('/best', options), {
      method: 'GET'
    })

    return response.json()
  }

  return {
    best
  }
}
