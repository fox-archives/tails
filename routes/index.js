import { Router } from 'express'

import rootRouter from '../routes/rootRouter'
import assetsRouter from '../routes/assetsRouter'
import projectsRouter from '../routes/projectsRouter'
import settingsRouter from '../routes/settingsRouter'
import actionsRouter from '../routes/actionRouter'
import projectRouter from '../routes/projectRouter'

const router = Router()

router.use('/', rootRouter)
router.use('/assets', assetsRouter)
router.use('/projects', projectsRouter)
router.use('/settings', settingsRouter)

// like-api (to-be microservice)
router.use('/action', actionsRouter)

// routes:hosted (to-be microservice)
router.use('/project', projectRouter)

export default router
