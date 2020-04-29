import Koa from 'koa'
import helmet from 'koa-helmet'
import mount from 'koa-mount'
import cors from '@koa/cors'
import graphqlHTTP from 'koa-graphql'

import { rootSchema } from './schema'

const isDev = process.env.NODE_ENV === 'development'

let app = new Koa()

app.use(cors())
app.use(helmet())

app.use(
  mount(
    '/graphql',
    graphqlHTTP({
      schema: rootSchema,
      graphiql: isDev,
      pretty: true,
    })
  )
)

app.use((ctx) => {
  ctx.body = 'hello world'
})

export { app }
