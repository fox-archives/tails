import path from 'path'
import fs from 'fs-extra'

import { getNamespaceFolder, readDirRaw } from './util'


export function createPhysicalProjectRaw(
  tailsRootDir,
  { namespace, projectName }
) {
  let actualProjectDir = tailsRootDir
  if (namespace) {
    actualProjectDir = getNamespaceFolder(tailsRootDir, namespace)
  }

  const finalProjectDir = path.join(actualProjectDir, projectName)
  return fs.mkdir(finalProjectDir, {
    mode: 0o755,
  })
}


export async function deletePhysicalProjectRaw(
  tailsRootDir,
  { namespace, projectName }
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


export async function gatherProjects(tailsRootDir, shouldGather) {
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


export async function pickProject(tailsRootDir, shouldPick) {
  let unfilteredProjectDirents
  try {
    unfilteredProjectDirents = await readDirRaw(tailsRootDir)
  } catch (err) {
    throw new Error(`failed to read directory ${tailsRootDir}`)
  }

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
          isSymbolicLink: dirent.isSymbolicLink(),
        }
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

      if (shouldPick(subDirent))
        return {
          name: subDirent.name,
          isDirectory: subDirent.isDirectory(),
          isFile: subDirent.isFile(),
          isSymbolicLink: subDirent.isSymbolicLink(),
        }
    }
  }
}
