import Router from '@koa/router'

import apiRoutes from './apiRoutes'

const router = new Router()

router.use('/api', apiRoutes)

export default router.routes()
