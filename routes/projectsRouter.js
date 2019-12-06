import { Router } from 'express'
import {
  projectsController,
  newProjectController,
  editProjectController
} from '../controllers/projectsController'

const router = Router()

router.get('/', projectsController)
router.get('/create', newProjectController) // TODO cleanup name
router.get('/edit', editProjectController)

export default router
