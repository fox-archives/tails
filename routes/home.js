import path from 'path';
import express from 'express';
import Project from '../models/project';

const router = express.Router();

const packagesDir = path.join(__dirname, '..', 'projects');

router.get('/', async (req, res) => {
  try {
    let p = await Project.getAll();

    res.render('home', {
      projects: p,
      hero: {
        header: 'welcome to tails',
        body: 'let\'s get started'
      }
    });
  }
  catch(err) {
    console.log(err);
  }


});

export default router;
