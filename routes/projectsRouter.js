import { Router } from 'express';
import {
  projectsController,
  newProjectController,
  projectCreateController,
  openController
} from '../controllers/projectsController';

const router = Router();

router.get('/', projectsController);
router.get('/create', newProjectController);
router.post('/create/action', projectCreateController);
router.get('/open/:project', openController);

export default router;
