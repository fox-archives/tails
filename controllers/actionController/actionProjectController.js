import Project from '../../models/projectModel'
import { validateProjectForm } from '../../validation/validateProjectForm'

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
  await deleteProjectService()

  res.redirect('/deleting-done')
}

export async function openProjectController(req, res) {
  let projectName = req.query.project
  await openProjectService(projectName)

  res.redirect(req.get('referer'))
}
