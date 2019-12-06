import { Router } from 'express'

import {
  projectsController,
  createProjectController,
  editProjectController
} from '../controllers/projectsController'

const router = Router()

router.get('/', projectsController)
router.get('/create', createProjectController) 
router.get('/edit', editProjectController)

export default router
