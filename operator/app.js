import Koa from 'koa'
import logger from 'koa-logger'
import helmet from 'koa-helmet'

import { initCleanup } from './core/cleanup'
import { initDb } from './core/db'
import routes from './routes'

initCleanup()
initDb()

const app = new Koa()
app.use(helmet())
app.use(logger())
app.use(routes)

app.on('error', err => console.error('e: ', err))

app.listen(3020)
