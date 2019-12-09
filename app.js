import { initEnv } from './core/env'
import { initMongo } from './core/mongo'
import { initExpress } from './core/express'

initEnv()
initMongo()
const app = initExpress()

app.on('listening', () => console.log('server restarted'))
app.listen(3000)
