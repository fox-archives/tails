import { join } from 'path';

import express from 'express';

import { initEnv } from './core/env'
import { initDb } from './core/db'
import { initExpress } from './core/express'
import routes from './routes'

initEnv()
initDb()

const app = initExpress()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(__dirname, 'public')))
app.use(routes)

app.on('listening', () => console.log('server restarted'))
app.listen(3000)
