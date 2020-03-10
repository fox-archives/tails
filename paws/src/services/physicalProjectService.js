import fs from 'fs'
import path from 'path'

import { getConfig } from '../util'

export async function listPhysicalProject(projectDir, opts = {
  simple: false
}) {
  let cfg;
  try {
    cfg = await getConfig(projectDir)
  } catch (err) {
    console.error(err)
    return
  }
  
  const unfilteredProjectDirs = await fs.promises.readdir(projectDir, {
    encoding: 'utf8',
    withFileTypes: true
  })
  let projects = unfilteredProjectDirs
    .filter(dirent => dirent.isDirectory())
    .filter(dirent => !cfg.files.folderGroups.includes(dirent.name))
  
  const promises = [];
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
    
  if (opts.simple) return projects.map(dirent => dirent.name)

  return projects
}

export async function showPhysicalProject(projectDir, projectName, opts = {
  simple: false
}) {
  let cfg;
  try {
    cfg = await getConfig(projectDir)
  } catch (err) {
    throw Error('could not read config file')
  }
  
  const unfilteredProjectDirs = await fs.promises.readdir(projectDir, {
    encoding: 'utf8',
    withFileTypes: true
  })
  let projects = unfilteredProjectDirs
    .filter(dirent => dirent.isDirectory())
  for (const dirent of projects) {
    if (dirent.name === projectName) {
      if (opts.simple) {
        return dirent.name
      }
      return {
        isBlockDevice: dirent.isBlockDevice(),
        isCharacterDevice: dirent.isCharacterDevice(),
        isDirectory: dirent.isDirectory(),
        isFIFO: dirent.isFIFO(),
        isFile: dirent.isFile(),
        isSocket: dirent.isSocket(),
        isSymbolicLink: dirent.isSymbolicLink(),
        name: dirent.name
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
    if (dirent.name === projectName) {
      if (opts.simple) {
        return dirent.name
      }
      return {
        isBlockDevice: dirent.isBlockDevice(),
        isCharacterDevice: dirent.isCharacterDevice(),
        isDirectory: dirent.isDirectory(),
        isFIFO: dirent.isFIFO(),
        isFile: dirent.isFile(),
        isSocket: dirent.isSocket(),
        isSymbolicLink: dirent.isSymbolicLink(),
        name: dirent.name
      }
    }
  }

  throw new Error('folder not found')
}
