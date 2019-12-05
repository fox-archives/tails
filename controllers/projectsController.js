import path from 'path'

import Project from '../models/projectModel'
import { launchCode } from '../services/vscode'
import {
  updateDatabase,
  actuallCreateProjectInProjectsFolder,
  deleteProject
} from '../services/projectServices'

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
  res.render('new-project', {
    hero: {
      header: 'create new project'
    }
  })
}

export async function projectCreateController(req, res) {
  const { projectName, projectType, projectDesc, projectSlug } = req.body

  await updateDatabase({ projectName, projectType, projectDesc, projectSlug })
  await actuallCreateProjectInProjectsFolder({
    projectType,
    projectSlug
  })

  res.redirect('/projects')
}

export function openController(req, res) {
  const pathToProject = path.join(__dirname, '../projects', req.params.project)
  launchCode(pathToProject)
  console.log(req.params.project)
  res.redirect(req.get('referer'))
}

export async function deleteTheProject(req, res) {
  console.log(req.query)
  await deleteProject(req.query.project)
  res.redirect(req.get('referer'))
}
