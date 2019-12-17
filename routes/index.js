import { Router } from 'express'

import rootRouter from './rootRouter'
import assetsRouter from './assetsRouter'
import projectsRouter from './projectsRouter'
import settingsRouter from './settingsRouter'
import actionsRouter from './actionRouter'
import projectRouter from './projectRouter'
import { errorController } from '../controllers/errorController'

const router = Router()

router.use('/', rootRouter)
router.use('/assets', assetsRouter)
router.use('/projects', projectsRouter)
router.use('/settings', settingsRouter)

// like-api (to-be microservice)
router.use('/action', actionsRouter)

// routes:hosted (to-be microservice)
router.use('/project', projectRouter)

router.use('/', errorController)

export default router
