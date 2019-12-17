import Project from '../../models/projectModel'

export async function createProjectController(req, res) {
  const { projectName, projectType, projectDesc, projectSlug } = req.body

  await Project.createProject({
    name: projectName,
    type: projectType,
    desc: projectDesc,
    slug: projectSlug
  })

  res.redirect('/projects')
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
