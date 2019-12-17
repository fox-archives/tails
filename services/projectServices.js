import path from 'path'
import { launchCode } from '../services/vscode'

export async function openProjectService(projectName) {
  const pathToProject = path.join(__dirname, '../projects', projectName)
  try {
    return await launchCode(pathToProject)
  } catch(err) {
    console.log('could not launch code', err)
  }
}
