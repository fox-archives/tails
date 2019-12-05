import { Router } from 'express'
import {
  projectsController,
  newProjectController,
  openController
} from '../controllers/projectsController'

const router = Router()

router.get('/', projectsController)
router.get('/create', newProjectController)
router.get('/open/:project', openController)

export default router
