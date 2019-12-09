import { join } from 'path'

import express from 'express'
import hbs from 'hbs'

export function initExpress() {
  const app = express()

  app.enable('case sensitive routing')
  app.set('json spaces', 2)
  app.disable('strict routing')
  app.set('views', join(__dirname, '../views'))
  app.set('view engine', 'hbs')
  app.disable('x-powered-by')

  app.engine('hbs', hbs.__express)
  hbs.registerPartials(join(__dirname, '../views/partials'))
  hbs.registerPartials(join(__dirname, '../views/components'))
  hbs.registerPartials(join(__dirname, '../views/forms'))
  hbs.localsAsTemplateData(app)

  return app
}
