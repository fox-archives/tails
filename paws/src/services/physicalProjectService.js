import path from 'path'

import {
  PhysicalProjectNotFoundError,
  InvalidArgumentError,
  PhysicalProjectAlreadyExistsError
} from '../util/errors'
import { readProjectDirRaw } from '../util'

export async function listPhysicalProject(projectDir) {
  const unfilteredProjectDirs = await readProjectDirRaw(projectDir)

  let projects = []
  for (const project of unfilteredProjectDirs) {
    // ignore files
    if (!project.isDirectory()) continue

    // if project does not begin with underscore push it
    if (!(project.name.slice(0, 1) === '_')) {
      projects.push(project)
    }

    // projects with underscores hold other projects. add them
    const subdirPath = path.join(projectDir, project.name)
    const subProjects = await readProjectDirRaw(subdirPath)

    for (let subProject of subProjects) {
      if (subProject.isDirectory()) {
        projects.push(subProject)
      }
    }
  }

  return projects.map(dirent => {
    return {
      name: dirent.name,
      isDirectory: dirent.isDirectory(),
      isFile: dirent.isFile(),
      isSymbolicLink: dirent.isSymbolicLink()
    }
  })
}

export async function showPhysicalProject(projectDir, params = {}) {
  if (!params.name) throw InvalidArgumentError("'name' property missing")

  const unfilteredProjectDirents = await readProjectDirRaw(projectDir)

  for (const dirent of unfilteredProjectDirents) {
    // ignore files
    if (!dirent.isDirectory()) continue

    // if project does not begin with underscore, test if the folder matches name
    if (!(dirent.name.slice(0, 1) === '_')) {
      if (dirent.name === params.name) {
        return {
          name: dirent.name,
          isDirectory: dirent.isDirectory(),
          isFile: dirent.isFile(),
          isSymbolicLink: dirent.isSymbolicLink()
        }
      }
    }

    // projects with underscores hold other projects. test for those
    const subdirPath = path.join(projectDir, dirent.name)
    const unfilteredSubProjectDirents = await readProjectDirRaw(subdirPath)

    for (let subDirent of unfilteredSubProjectDirents) {
      if (subDirent.isDirectory()) {
        if (subDirent.name === params.name) {
          return {
            name: subDirent.name,
            isDirectory: subDirent.isDirectory(),
            isFile: subDirent.isFile(),
            isSymbolicLink: subDirent.isSymbolicLink()
          }
        }
      }
    }
  }

  throw new PhysicalProjectNotFoundError()
}
