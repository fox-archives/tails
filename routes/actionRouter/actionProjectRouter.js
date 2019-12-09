import { Router } from 'express'

import {
  createProjectController,
  editProjectController,
  deleteProjectController,
  openProjectController
} from '../../controllers/actionController/actionProjectController'

const router = Router()

router.post('/create', createProjectController)
router.post('/edit', editProjectController)
router.post('/delete', deleteProjectController)
router.get('/open', openProjectController)

export default router
