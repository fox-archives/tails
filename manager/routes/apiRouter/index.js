import Router from '@koa/router'

import v1Router from './v1'

const router = new Router()

router.use('/v1', v1Router)

export default router.routes()
