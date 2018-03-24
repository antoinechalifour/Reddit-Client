export function getListingFromQuerystring (search) {
  const params = new window.URLSearchParams(search)
  const listing = {}
  const parts = [
    {
      name: 'before',
      parse: x => x
    },
    {
      name: 'after',
      parse: x => x
    },
    {
      name: 'count',
      parse: Number
    }
  ]

  parts.forEach(({ name, parse }) => {
    if (params.has(name)) {
      listing[name] = parse(params.get(name))
    }
  })

  return listing
}

export function getPreviousListingParams (listingParams, listing) {
  return {
    count: listingParams.count + 1,
    before: listing.before
  }
}

export function getNextListingParams (listingParams, listing) {
  const currentCount = listingParams.count || 0

  const count = listingParams.before
    ? listingParams.count - 1
    : currentCount + listing.children.length
  const after = listing.after

  return { count, after }
}
