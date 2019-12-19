import Router from '@koa/router'

import { errorController } from '../controllers/errorController'
import { rootController } from '../controllers/rootController'
import apiRouter from './apiRouter'

const router = new Router()

router.use(errorController)
router.get('/', rootController)
router.use('/api', apiRouter)

export default router.routes()
