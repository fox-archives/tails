import path from 'path'

import {
  DoesNotExistError,
  AlreadyExistsError,
  InvalidArgumentError
} from './util/errors'
import {
  readDirRaw,
  createPhysicalNamespaceRaw,
  deletePhysicalNamespaceRaw
} from './util'

export async function listPhysicalNamespace(projectDir) {
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

export async function showPhysicalNamespace(projectDir, args = {}) {
  if (!args.name) throw new InvalidArgumentError("'name' property missing")

  let dirents
  try {
    dirents = await readDirRaw(projectDir)
  } catch (err) {
    throw new Error(`failed to read directory ${projectDir}`)
  }

  for (let dirent of dirents) {
    if (!dirent.name.slice(0, 1) === '_') continue

    if (dirent.name.slice(1) === args.name) {
      return {
        name: dirent.name.slice(1),
        isDirectory: true,
        isFile: false,
        isSymbolicLink: false
      }
    }
  }

  throw new DoesNotExistError(`namespace ${args.name} not found`)
}

export async function createPhysicalNamespace(projectDir, args = {}) {
  if (!args.name) throw new InvalidArgumentError("'name' property missing")

  try {
    await createPhysicalNamespaceRaw(projectDir, args.name)
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new AlreadyExistsError(`namespace '${args.name}' already exists`)
    }
    console.error(err)
    throw new Error(
      `${__dirname}: an unknown error occurred when trying to create namespace ${args.name} in ${projectDir}`
    )
  }
}

export async function deletePhysicalNamespace(projectDir, args = {}) {
  if (!args.name) throw new InvalidArgumentError("'name' property missing")

  try {
    await deletePhysicalNamespaceRaw(projectDir, args.name)
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new DoesNotExistError(`namespace '${args.name}' does not exist`)
    }
    console.error(err)
    throw new Error(
      `${__dirname}: an unknown error ocurred when trying to remove namespace ${args.name} in ${projectDir}`
    )
  }
}
