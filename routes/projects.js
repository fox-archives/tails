import path from 'path';
import express from 'express';
import {
  projectController,
  projectImageBuildController,
  projectContainerCreateController,
  projectContainerStartController
} from '../controllers/projectController';
import Project from '../models/projectModel';

const router = express.Router();

router.get('/', projectController);

router.get('/image/build/:projectId', projectImageBuildController);
router.get('/container/create/:project', projectContainerCreateController);
router.get('/container/start/:projectId', projectContainerStartController);

// todo: refactor
Project.getAll()
.then(p => {
  p.forEach(project => {
    router.use(`/${project}`, express.static(path.join(__dirname, '..', 'projects', project)));
  });
})
.catch(err => {
  console.log(err);
});

export default router;
