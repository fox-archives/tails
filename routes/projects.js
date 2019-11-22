import path from 'path';
import express from 'express';
import {
  projectsController,
  newProjectController,
  projectCreateController
} from '../controllers/projectsController';

const router = express.Router();

router.get('/', projectsController);
router.get('/create', newProjectController);
router.get('/create/action', projectCreateController);

export default router;
