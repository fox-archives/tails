import Router from '@koa/router'

import {
  createProjectController,
  editProjectController,
  deleteProjectController,
  openProjectController
} from '../../controllers/apiController'

const router = new Router()

router.post('/project/create', createProjectController)
router.post('/project/edit', editProjectController)
router.post('/project/delete', deleteProjectController)
router.post('/project/open', openProjectController)

export default router.routes()
