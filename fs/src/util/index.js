import fs from 'fs-extra'
import path from 'path'

import { RUNTIME_CONFIG_STATUS, RUNTIME_CONFIG } from '../config'
import { StorageReadError } from './errors'

export async function readProjectDirRaw(projectDir) {
  try {
    return await fs.promises.readdir(projectDir, {
      encoding: 'utf8',
      withFileTypes: true
    })
  } catch (err) {
    throw new StorageReadError(
      `failed to read directory ${projectDir}`
    )
  }
}

export async function fsCreateNamespace(projectDir, namespace) {
  const namespaceFolder = path.join(projectDir, `${_}namespace`)
  await fs.promises.mkdir(namespaceFolder, {
    mode: 0o755
  })
}

export async function fsCreateProject(projectDir, projectName, namespace) {
  if (namespace === 'default') {
    await fs.promises.mkdir
  } 
}

export async function gatherProjects(projectDir, shouldGather) {
  const unfilteredProjectDirents = await readProjectDirRaw(projectDir)

  let projects = []
  for (const dirent of unfilteredProjectDirents) {
    // ignore non-directories
    if (!dirent.isDirectory()) continue

    // if project does not begin with underscore, test if the folder matches name
    if (!(dirent.name.slice(0, 1) === '_')) {
      if (shouldGather(dirent))
        projects.push({
          name: dirent.name,
          isDirectory: dirent.isDirectory(),
          isFile: dirent.isFile(),
          isSymbolicLink: dirent.isSymbolicLink()
        })
    }

    // projects with underscores hold other projects. test for those
    const subdirPath = path.join(projectDir, dirent.name)
    const unfilteredSubProjectDirents = await readProjectDirRaw(subdirPath)

    for (let subDirent of unfilteredSubProjectDirents) {
      // ignore non-directories
      if (!subDirent.isDirectory()) continue

      if (shouldGather(subDirent))
        projects.push({
          name: subDirent.name,
          isDirectory: subDirent.isDirectory(),
          isFile: subDirent.isFile(),
          isSymbolicLink: subDirent.isSymbolicLink()
        })
    }
  }
  return projects
}

export async function pickProject(projectDir, shouldPick) {
  const unfilteredProjectDirents = await readProjectDirRaw(projectDir)

  for (const dirent of unfilteredProjectDirents) {
    // ignore non-directories
    if (!dirent.isDirectory()) continue

    // if project does not begin with underscore, test if the folder matches name
    if (!(dirent.name.slice(0, 1) === '_')) {
      if (shouldPick(dirent))
        return {
          name: dirent.name,
          isDirectory: dirent.isDirectory(),
          isFile: dirent.isFile(),
          isSymbolicLink: dirent.isSymbolicLink()
        }
    }

    // projects with underscores hold other projects. test for those
    const subdirPath = path.join(projectDir, dirent.name)
    const unfilteredSubProjectDirents = await readProjectDirRaw(subdirPath)

    for (let subDirent of unfilteredSubProjectDirents) {
      // ignore non-directories
      if (!subDirent.isDirectory()) continue

      if (shouldPick(subDirent))
        return {
          name: subDirent.name,
          isDirectory: subDirent.isDirectory(),
          isFile: subDirent.isFile(),
          isSymbolicLink: subDirent.isSymbolicLink()
        }
    }
  }
}
