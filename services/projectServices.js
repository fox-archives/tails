import path from 'path';

import Project from '../models/projectModel'
import { launchCode } from '../services/vscode'

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

export async function openProjectService(projectName) {
  const pathToProject = path.join(__dirname, '../projects', projectName)
  try {
    return await launchCode(pathToProject)
  } catch(err) {
    console.log('could not launch code', err)
  }
}
