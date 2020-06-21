import { Middleware, isHttpError } from 'https://deno.land/x/oak/mod.ts'

const errorHandlerMiddleware: Middleware = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (isHttpError(error)) {
      ctx.response.status = error.status
      const { message, stack, status } = error
      if (ctx.request.accepts('application/json')) {
        ctx.response.body = { status, message, stack }
        ctx.response.type = 'json'
      } else {
        ctx.response.body = `${status} ${message}\n${stack ?? ''}`
        ctx.response.type = 'text/plain'
      }
    } else {
      const { message, stack } = error
      ctx.response.status = 500
      ctx.response.body = { status: 500, message, stack }
      ctx.response.type = 'json'
    }
  }
}

export default errorHandlerMiddleware
