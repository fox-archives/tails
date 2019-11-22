import path from 'path';
import Project from '../models/projectModel';

export function projectsController(req, res) {
  Project.getProjects().then(projects => {
    res.render('projects', {
      hero: {
        header: 'welcome to tails',
        body: "let's get started"
      },
      projects: projects
    });
  });
}

export function newProjectController(req, res) {
  res.render('new-project', {
    hero: {
      header: 'create new project'
    }
  });
}

export function projectCreateController(req, res) {
  console.log(req.body);
  res.send(req.body);
}
