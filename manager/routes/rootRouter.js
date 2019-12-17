import Router from '@koa/router'

import {
  rootController
} from '../controllers/rootController'

const router = new Router()

router.get('/', rootController)

export default router.routes()
