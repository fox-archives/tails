import { Router } from 'express'
import {
  projectsController,
  newProjectController,
  projectCreateController,
  openController,
  deleteTheProject
} from '../controllers/projectsController'

const router = Router()

router.get('/', projectsController)
router.get('/create', newProjectController)
router.post('/create/action', projectCreateController)
router.get('/open/:project', openController)
router.post('/delete', deleteTheProject)

export default router
