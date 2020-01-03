import Koa from 'koa'
import logger from 'koa-logger'
import helmet from 'koa-helmet'
import bodyParser from 'koa-bodyparser'

import { initCleanup } from './core/cleanup'
import { initDb } from './core/db'
import './subscribers/project'
import routes from './routes'

initCleanup()
initDb()

const app = new Koa()
app.use(logger())
app.use(helmet())
app.use(bodyParser())

app.use(routes)

app.on('error', err => console.error('e: ', err))

const port = process.env.PORT || 3020
app.listen(port)

export default app.listen()
