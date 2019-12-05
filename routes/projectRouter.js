import { Router } from 'express';
import {
  projectController,
  projectCheckIfShouldBeShown,
  showProject
} from '../controllers/projectController';

const router = Router();

router.get('/', projectController);
router.use('/', projectCheckIfShouldBeShown, showProject);

export default router;
