export default function HttpClient () {
  const middlewares = []

  const executeRequest = async context => {
    const response = await window.fetch(context.url, context.request)

    if (response.ok) {
      return response
    } else {
      const err = new Error('Http error')
      err.context = context
      err.response = response
      throw err
    }
  }

  const addMiddleware = middleware => middlewares.push(middleware)
  const request = (url, options = {}) => {
    const context = {
      url,
      request: options
    }
    const chain = middlewares.reduceRight(
      (acc, middleware) => {
        return middleware(acc)
      },
      ctx => executeRequest(ctx)
    )

    return chain(context)
  }
  const rawRequest = (url, options) => window.fetch(url, options)

  return {
    addMiddleware,
    request,
    rawRequest
  }
}
