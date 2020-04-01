import * as ERROR from './errors'

import {
  readDirRaw,
  createPhysicalNamespaceRaw,
  deletePhysicalNamespaceRaw
} from './util'

const projectDir = '/home/edwin/docs/programming/repos/tails/projects'

export async function listPhysicalNamespace() {
  let dirents
  try {
    dirents = await readDirRaw(projectDir)
  } catch (err) {
    throw new Error(`failed to read directory ${projectDir}`)
  }

  let namespaces = []
  for (let dirent of dirents) {
    if (dirent.name.slice(0, 1) === '_') {
      namespaces.push({
        name: dirent.name.slice(1),
        isDirectory: true,
        isFile: false,
        isSymbolicLink: false
      })
    }
  }
  return { namespaces }
}

export async function showPhysicalNamespace(name) {
  if (!name) throw new ERROR.InvalidArgumentError('name')

  let dirents
  try {
    dirents = await readDirRaw(projectDir)
  } catch (err) {
    throw new Error(`failed to read directory ${projectDir}`)
  }

  for (let dirent of dirents) {
    if (!dirent.name.slice(0, 1) === '_') continue

    if (dirent.name.slice(1) === name) {
      return {
        name: dirent.name.slice(1),
        isDirectory: true,
        isFile: false,
        isSymbolicLink: false
      }
    }
  }

  throw new ERROR.DoesNotExistError(`namespace ${name} not found`)
}

export async function createPhysicalNamespace(name) {
  if (!name)
    throw new ERROR.InvalidArgumentError('name')

  try {
    await createPhysicalNamespaceRaw(projectDir, name)
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new ERROR.AlreadyExistsError(
        `namespace '${name}' already exists`
      )
    }
    console.error(err)
    throw new Error(
      `${__dirname}: an unknown error occurred when trying to create namespace ${args} in ${projectDir}`
    )
  }
}

export async function deletePhysicalNamespace(name) {
  if (!name)
    throw new ERROR.InvalidArgumentError('name')

  try {
    await deletePhysicalNamespaceRaw(projectDir, name)
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new ERROR.DoesNotExistError(
        `namespace '${name}' does not exist`
      )
    }
    console.error(err)
    throw new Error(
      `${__dirname}: an unknown error ocurred when trying to remove namespace ${args} in ${projectDir}`
    )
  }
}

export class PhysicalNamespace {
  static list() {
    return listPhysicalNamespace()
  }

  static show(name) {
    return showPhysicalNamespace(name)
  }

  static create(name) {
    return createPhysicalNamespace(name)
  }

  static delete(name) {
    return deletePhysicalNamespace(name)
  }
}
