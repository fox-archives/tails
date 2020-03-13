import fs from 'fs-extra'
import path from 'path'

import grpc from 'grpc'

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

// cb is the cb argument received from grpc functions
export async function requireRuntimeConfigInit(cb) {
  if (RUNTIME_CONFIG.STATUS === RUNTIME_CONFIG_STATUS.INVALID) {
    cb({
      code: grpc.status.FAILED_PRECONDITION,
      details:
        'runtime configuration not setup. ensure you first initiate grpc call to set config before making any other calls'
    })
    return true
  }

  if (RUNTIME_CONFIG.status === RUNTIME_CONFIG_STATUS.STALE) {
    // right now, nothing sets the status as 'stale'. if we have something that does,
    // we can make grpc call to `coordinator` to grab config. we can also do this
    // automatically when the status is in an 'INVALID' state. this is why the
    // function is async (even if there are no implementations that depend on it)
  }

  if (RUNTIME_CONFIG.status === RUNTIME_CONFIG_STATUS.UPDATED) {
    // config is updated, we don't need to do anything
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
