import { Router } from 'express';

import {
  rootController
} from '../controllers/rootController'

const router = Router()

router.get('/', rootController)

export default router;
