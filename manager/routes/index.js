import Router from '@koa/router'

import rootRouter from './rootRouter'
import apiRouter from './apiRouter'

const router = new Router()

router.use('/', rootRouter)
router.use('/api', apiRouter)

export default router.routes()
