import path from 'path';
import express from 'express';
import {
  projectController,
  projectImageBuildController
} from '../controllers/projectController';
import Project from '../models/projectModel';

const router = express.Router();

router.get('/', projectController);

router.get('/image/build/:projectId', projectImageBuildController);

// todo: refactor
let pNames = [];
Project.getProjectNames()
.then(projectNames => {
  pNames = projectNames;
  return Project.getProjectMetaData(projectNames);
})
.then(projectData => {
  projectData.forEach((project, i) => {
    router.use(`/${project.slug}`, express.static(path.join(__dirname, '..', 'projects', pNames[i])));
  });
})
.catch(err => {
  console.log(err);
});

export default router;
