import { Router } from 'express'

import {
  projectsController,
  createProjectControllerGet,
  createProjectControllerPost,
  editProjectControllerGet,
  editProjectControllerPost,
} from '../controllers/projectsController'

const router = Router()

router.get('/', projectsController)
router.get('/create', createProjectControllerGet)
router.post('/create', createProjectControllerPost)
router.get('/edit', editProjectControllerGet)
router.post('/edit', editProjectControllerPost)

export default router
