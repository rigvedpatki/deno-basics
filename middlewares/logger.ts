import { green, cyan, bold, red } from 'https://deno.land/std/fmt/colors.ts'
import { Middleware } from 'https://deno.land/x/oak/mod.ts'

const loggerMiddleware: Middleware = async (ctx, next) => {
  await next()
  const rt = ctx.response.headers.get('X-Response-Time')
  const status = ctx.response.status
  console.log(
    `${green(ctx.request.method)} ${
      status >= 400 ? red(String(status)) : green(String(status))
    } ${cyan(ctx.request.url.pathname)} - ${bold(String(rt))}`
  )
}

export default loggerMiddleware
