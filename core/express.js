import path from 'path'

import express from 'express'
import hbs from 'hbs'

import routes from '../routes'

export function initExpress() {
  const app = express()

  app.enable('case sensitive routing')
  app.set('json spaces', 2)
  app.disable('strict routing')
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'hbs')
  app.disable('x-powered-by')

  app.engine('hbs', hbs.__express)
  hbs.registerPartials(path.join(__dirname, 'views/partials'))
  hbs.registerPartials(path.join(__dirname, 'views/components'))
  hbs.registerPartials(path.join(__dirname, 'views/forms'))
  hbs.localsAsTemplateData(app)

  // middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(path.join(__dirname, 'public')))
  app.use(routes)

  return app
}
