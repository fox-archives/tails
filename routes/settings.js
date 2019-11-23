import { Router } from 'express'

import { settingsController } from '../controllers/settingsController'

const router = Router()

router.get('/', settingsController)

export default router;
