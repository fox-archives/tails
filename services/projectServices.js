import Project from '../models/projectModel'

export async function createProjectService({
  projectName,
  projectType,
  projectDesc,
  projectSlug
}) {
  await Project.createProject({
    projectName,
    projectType,
    projectDesc,
    projectSlug
  })
}
export async function deleteProjectService(projectName) {
  return Project.deleteProject(projectName)
}
