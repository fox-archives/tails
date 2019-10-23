import path from 'path';
import express from 'express';
import Project from '../models/project';


const router = express.Router();

const packagesDir = path.join(__dirname, '..', 'projects');

router.get('/', async (req, res) => {
  try {
    let p = await Project.getAll();

    res.render('projects', {
      projects: p,
      hero: {
        header: 'my projects',
        body: 'these projects are cool'
      }
    });
  }
  catch(err) {
    console.log(err);
  }
});

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
