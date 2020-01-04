import _ from 'lodash'
import Project from '../models/projectModel'

// lists data of all projects
export async function listProjectService() {
  return await Project.listProjects()
}

// lists data of single project
export async function viewProjectService(project) {
  const projectName = project.name
  await Project.getProject(projectName)
}

export async function createProjectService(project) {
  await Project.createProject(project)
}

export async function editProjectService(project) {
  await Project.findOneAndUpdate(project.id, project, {
      new: true,
      returnOriginal: true
  })
}
