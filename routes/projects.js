import path from 'path';
import express from 'express';

const router = express.Router();

const packagesDir = path.join(__dirname, '..', 'projects');
(async () => {
  let p = await require('../controller/projects').projects(packagesDir);
  p.forEach(project => {
    router.use(`/${project}`, express.static(path.join(__dirname, '..', 'projects', project)));
  });
})();


export default router;
