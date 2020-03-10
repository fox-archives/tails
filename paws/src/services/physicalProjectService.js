import fs from 'fs'
import path from 'path'

import { getConfig } from '../util'

export async function listPhysicalProject(projectDir) {
  let cfg
  try {
    cfg = await getConfig(projectDir)
  } catch (err) {
    throw new Error('foo')
  }
  // if (params.name) {
  //   console.log('hehefffffffffffff', projectDir)
  //   throw new Error('must not name property')
  //   return
  // }

  // if (params.name) throw new Error('must not name property')
  let unfilteredProjectDirs
  try {
    unfilteredProjectDirs = await fs.promises.readdir(projectDir, {
      encoding: 'utf8',
      withFileTypes: true
    })
  } catch (err) {
    throw new Error('famma')
  }
  let projects = unfilteredProjectDirs
    .filter(dirent => dirent.isDirectory())
    .filter(dirent => !cfg.files.folderGroups.includes(dirent.name))

  const promises = []
  for (let folderGroup of cfg.files.folderGroups) {
    const promise = fs.promises.readdir(path.join(projectDir, folderGroup), {
      encoding: 'utf8',
      withFileTypes: true
    })
    promises.push(promise)
  }

  const unfilteredSubProjectDirs = await Promise.all(promises)
  let subProjects = unfilteredSubProjectDirs
    .flat()
    .filter(dirent => dirent.isDirectory())

  projects = [...projects, ...subProjects]

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
  let cfg
  try {
    cfg = await getConfig(projectDir)
  } catch (err) {
    throw Error('could not read config file')
  }

  if (!params.name) throw Error('must have name property')

  const unfilteredProjectDirs = await fs.promises.readdir(projectDir, {
    encoding: 'utf8',
    withFileTypes: true
  })
  let projects = unfilteredProjectDirs.filter(dirent => dirent.isDirectory())

  for (const dirent of projects) {
    if (dirent.name === params.name) {
      return {
        name: dirent.name,
        isDirectory: dirent.isDirectory(),
        isFile: dirent.isFile(),
        isSymbolicLink: dirent.isSymbolicLink(),
      }
    }
  }

  const promises = []
  for (let folderGroup of cfg.files.folderGroups) {
    const promise = fs.promises.readdir(path.join(projectDir, folderGroup), {
      encoding: 'utf8',
      withFileTypes: true
    })
    promises.push(promise)
  }
  const unfilteredSubProjectDirs = await Promise.all(promises)
  let subProjects = unfilteredSubProjectDirs
    .flat()
    .filter(dirent => dirent.isDirectory())
  for (const dirent of subProjects) {
    if (dirent.name === params.name) {
      return {
        name: dirent.name,
        isDirectory: dirent.isDirectory(),
        isFile: dirent.isFile(),
        isSymbolicLink: dirent.isSymbolicLink()
      }
    }
  }

  throw new Error('folder not found')
}
