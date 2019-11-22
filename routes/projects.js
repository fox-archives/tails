import path from 'path';
import { Router } from 'express';
import {
  projectsController,
  newProjectController,
  projectCreateController
} from '../controllers/projectsController';

const router = Router();

router.get('/', projectsController);
router.get('/create', newProjectController);
router.get('/create/action', projectCreateController);

export default router;
