import { Router } from 'express';

import {
  rootController,
  errorController
} from '../controllers/rootController'

const router = Router()

router.get('/', rootController)
router.get('/error', errorController)

export default router;
