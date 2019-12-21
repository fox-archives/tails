import Router from '@koa/router'

import { readFsProjectController } from '../controllers/readController'

const router = new Router()

router.get('/read', readFsProjectController);

export default router.routes()
