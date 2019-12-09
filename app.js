import path from 'path'
import express from 'express'
import hbs from 'hbs'

import { initEnv } from './core/env'
import { initMongo } from './core/mongo'
import { cssRouter } from './routes/assetsRouter'
import projectsRouter from './routes/projectsRouter'
import settingsRouter from './routes/settingsRouter'
import projectRouter from './routes/projectRouter'
import actionsRouter from './routes/actionRouter'

// core
initEnv()
initMongo()

const app = express()

// config
app.enable('case sensitive routing')
app.set('json spaces', 2)
app.disable('strict routing')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.disable('x-powered-by')

app.engine('hbs', hbs.__express)
hbs.registerPartials(path.join(__dirname, 'views', 'partials'))
hbs.registerPartials(path.join(__dirname, 'views', 'components'))
hbs.registerPartials(path.join(__dirname, 'views', 'forms'))
hbs.localsAsTemplateData(app)

// middleware
app.use('/', express.json())
app.use('/', express.urlencoded({ extended: true }))

// assets
app.use('/css', cssRouter)
app.use('/', express.static(path.join(__dirname, 'public')))

// routes:app
// setup a home page with 'recommendations' and actions later
app.get('/', (req, res) => res.redirect('/projects'))
app.use('/projects', projectsRouter)
app.use('/settings', settingsRouter)

// like-api (to-be microservice)
app.use('/action', actionsRouter)

// routes:hosted (to-be microservice)
app.use('/project', projectRouter)

app.on('listening', () => console.log('server restarted'))
app.listen(3004)
