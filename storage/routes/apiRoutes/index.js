import Router from '@koa/router'

import { readFsProjectController } from '../../controllers/readController'

const router = Router()

router.get('/projects/read', readFsProjectController)

export default router.routes()
