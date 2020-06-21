import { yellow, bold } from 'https://deno.land/std/fmt/colors.ts'
import { Application } from 'https://deno.land/x/oak/mod.ts'
import router from './routes.ts'
import errorHandler from './middlewares/error-handler.ts'
import logger from './middlewares/logger.ts'
import responseTime from './middlewares/response-time.ts'
import notFound from './middlewares/not-found-error.ts'

const port = 5000

const app = new Application()

app.use(logger)
app.use(responseTime)
app.use(errorHandler)

app.use(router.routes())

app.use(notFound)

app.addEventListener('listen', ({ hostname, port }) => {
  console.log(bold('Server started on ') + yellow(`http://${hostname}:${port}`))
})

await app.listen({ port, hostname: 'localhost' })
