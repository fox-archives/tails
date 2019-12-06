import { Router } from 'express'
import {
  projectsController,
  newProjectController
} from '../controllers/projectsController'

const router = Router()

router.get('/', projectsController)
router.get('/create', newProjectController)

export default router
