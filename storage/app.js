import Koa from 'koa'
import logger from 'koa-logger'
import helmet from 'koa-helmet'

import routes from './routes'

const app = new Koa()
app.use(helmet())
app.use(logger())

app.use(routes)

app.on('error', err => console.error('e: ', err))

app.listen(3040)
