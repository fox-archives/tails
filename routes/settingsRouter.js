import { Router } from 'express'

import {
  settingsController,
  generateScreenshots,
  generateProjects
} from '../controllers/settingsController'

const router = Router()

router.get('/', settingsController)
router.post('/generate-screenshots', generateScreenshots)
router.post('/generate-projects', generateProjects)

export default router
