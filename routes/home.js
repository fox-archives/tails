import path from 'path';
import express from 'express';
import { projects } from '../controller/projects';

const router = express.Router();

const packagesDir = path.join(__dirname, '..', 'projects');
(async () => {
  let p = await projects(packagesDir);

  router.get('/', (req, res) => {
    res.render('index', { projects: p });
  });
})();

export default router;
