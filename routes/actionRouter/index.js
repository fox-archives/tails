import { Router } from 'express';

import actionProjectRouter from './actionProjectRouter'

const actionRouter = Router()

actionRouter.use('/project', actionProjectRouter)

export default actionRouter
