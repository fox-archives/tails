import { Router } from 'express'

import rootRouter from './rootRouter'
import assetsRouter from './assetsRouter'
import projectsRouter from './projectsRouter'
import settingsRouter from './settingsRouter'
import { errorController } from '../controllers/errorController'

const router = Router()

router.use('/', rootRouter)
router.use('/assets', assetsRouter)
router.use('/projects', projectsRouter)
router.use('/settings', settingsRouter)
router.use('/', errorController)

export default router
