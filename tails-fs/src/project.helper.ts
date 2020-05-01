import path from 'path'
import fs from 'fs-extra'

import { getNamespaceFolder, readDirRaw } from './util'

interface namespaceProjectNameTemp {
  namespace: string | undefined
  projectName: string
}

export function createPhysicalProjectRaw(
  tailsRootDir: string,
  { namespace, projectName }: namespaceProjectNameTemp
) {
  let actualProjectDir = tailsRootDir
  if (namespace) {
    actualProjectDir = getNamespaceFolder(tailsRootDir, namespace)
  }

  const finalProjectDir = path.join(actualProjectDir, projectName)
  return fs.promises.mkdir(finalProjectDir, {
    mode: 0o755,
  })
}

export async function deletePhysicalProjectRaw(
  tailsRootDir: string,
  { namespace, projectName }: namespaceProjectNameTemp
) {
  let actualProjectDir = tailsRootDir
  if (namespace) {
    actualProjectDir = getNamespaceFolder(tailsRootDir, namespace)
  }

  // we include the stat because fs.remove from fs-extra does not
  // error if the folder does not exist. fs.stat does
  const projectFolder = path.join(actualProjectDir, projectName)
  await fs.stat(projectFolder)
  await fs.remove(projectFolder)
}

// TODO: fix shouldGather: function
export async function gatherProjects(tailsRootDir: string, shouldGather: Function) {
  let unfilteredProjectDirents
  try {
    unfilteredProjectDirents = await readDirRaw(tailsRootDir)
  } catch (err) {
    throw new Error(`failed to read directory ${tailsRootDir}`)
  }

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
          isSymbolicLink: dirent.isSymbolicLink(),
        })
    }

    // projects with underscores hold other projects. test for those
    const subdirPath = path.join(tailsRootDir, dirent.name)
    let unfilteredSubProjectDirents

    try {
      unfilteredSubProjectDirents = await readDirRaw(subdirPath)
    } catch (err) {
      throw new Error(`failed to read directory ${subdirPath}`)
    }
    for (let subDirent of unfilteredSubProjectDirents) {
      // ignore non-directories
      if (!subDirent.isDirectory()) continue

      if (shouldGather(subDirent))
        projects.push({
          name: subDirent.name,
          isDirectory: subDirent.isDirectory(),
          isFile: subDirent.isFile(),
          isSymbolicLink: subDirent.isSymbolicLink(),
        })
    }
  }
  return projects
}

export function isNamespace(string: string) {
  return string.indexOf('_') === 0
}

// TODO: fix
// @ts-ignore
export async function pickProject(directoryBeingSearched: string, project: string) {
  let unfilteredProjectDirents
  try {
    unfilteredProjectDirents = await readDirRaw(directoryBeingSearched)
  } catch (err) {
    throw new Error(`failed to read directory ${directoryBeingSearched}`)
  }

  for (const dirent of unfilteredProjectDirents) {
    // ignore non-directories and namespaces
    if (!dirent.isDirectory()) continue
    if (isNamespace(dirent.name)) continue

    if (dirent.name === project) {
      return {
        name: dirent.name,
        isDirectory: dirent.isDirectory(),
        isFile: dirent.isFile(),
        isSymbolicLink: dirent.isSymbolicLink(),
      }
    }
  }
}
