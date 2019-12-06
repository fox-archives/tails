import { Router } from 'express';

import actionProjectRouter from './actionProjectRouter'

const router = Router()

router.use('/project', actionProjectRouter)

export default router
