import path from 'path'

import Project from '../../models/projectModel'
import { validateProjectForm } from '../../validation/validateProjectForm'
import { launchCode } from '../../services/vscode'
import { validateProjectPath } from '../../validation/validateProject'

export async function createProjectController(req, res) {
  const { projectName, projectType, projectDesc, projectSlug } = req.body

  const err = validateProjectForm(
    projectName, projectType, projectDesc, projectSlug
  )
  if (err) {
    res.render('forms/createProjectForm', {
      err,
      hero: {
        header: 'create new project'
      }
    })
    return
  }

  try {
    await Project.createProject({
      name: projectName,
      type: projectType,
      desc: projectDesc,
      slug: projectSlug
    })

    res.redirect('/projects')
  } catch {
    res.redirect('/error')
  }
}

export async function editProjectController(req, res) {
  await editProjectService()

  res.redirect()
}

export async function deleteProjectController(req, res) {

}

export async function openProjectController(req, res) {
  let projectName = req.query.project
  projectName = path.join(__dirname, '../thing', projectName)
  try {
    validateProjectPath(projectName)
    await launchCode(projectName)
    res.redirect(req.get('referer'))
  }
  catch {
    res.render('pages/projects', {
      err: 'project does not exist',
      hero: {
        header: 'welcome to tails',
        body: 'let\'s get started'
      }
    })
  }
}
