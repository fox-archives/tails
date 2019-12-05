import { Router } from 'express'

import {
  deleteProjectController,
  createProjectController
} from '../../controllers/actionController/actionProjectController'

const router = Router()

router.post('/create', createProjectController)
router.post('/delete', deleteProjectController)

export default router
