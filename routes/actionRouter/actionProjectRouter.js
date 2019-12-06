import { Router } from 'express'

import {
  deleteProjectController,
  createProjectController,
  openProjectController
} from '../../controllers/actionController/actionProjectController'

const router = Router()

router.post('/create', createProjectController)
router.post('/delete', deleteProjectController)
router.get('/open', openProjectController)

export default router
