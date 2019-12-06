import path from 'path'

import Project from '../models/projectModel'

export function projectsController(req, res) {
  Project.getProjects().then(projects => {
    res.render('projects', {
      hero: {
        header: 'welcome to tails',
        body: "let's get started"
      },
      projects: projects
    })
  })
}

export function newProjectController(req, res) {
  res.render('forms/createProject', {
    hero: {
      header: 'create new project'
    }
  })
}
