import { Router } from 'express'

import {
  settingsController,
  generateScreenshots
} from '../controllers/settingsController'

const router = Router()

router.get('/', settingsController)
router.post('/generate-screenshots', generateScreenshots)

export default router
