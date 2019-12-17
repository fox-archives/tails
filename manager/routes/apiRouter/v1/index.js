import Router from '@koa/router'

import {
  actionController
} from '../../../controllers/apiController/v1'

const router = new Router()

router.get('/action', actionController)

export default router.routes()
