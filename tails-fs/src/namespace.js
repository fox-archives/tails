import { Config } from './config'

import * as ERROR from './errors'
import { readDirRaw } from './util'
import * as helper from './namespace.helper'

const TAILS_ROOT_DIR = 'TAILS_ROOT_DIR'

export async function listPhysicalNamespaces() {
  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  let dirents
  try {
    dirents = await readDirRaw(tailsRootDir)
  } catch (err) {
    throw new Error(`failed to read directory ${tailsRootDir}`)
  }

  let namespaces = []
  for (let dirent of dirents) {
    if (dirent.name.slice(0, 1) === '_') {
      namespaces.push({
        name: dirent.name.slice(1),
        isDirectory: true,
        isFile: false,
        isSymbolicLink: false,
      })
    }
  }
  return { namespaces }
}

export async function showPhysicalNamespace(name) {
  if (!name) throw new ERROR.InvalidArgumentError('name', name)

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  let dirents
  try {
    dirents = await readDirRaw(tailsRootDir)
  } catch (err) {
    throw new Error(`failed to read directory '${tailsRootDir}'`)
  }

  for (let dirent of dirents) {
    if (!dirent.name.slice(0, 1) === '_') continue

    if (dirent.name.slice(1) === name) {
      return {
        name: dirent.name.slice(1),
        isDirectory: true,
        isFile: false,
        isSymbolicLink: false,
      }
    }
  }

  throw new ERROR.DoesNotExistError('namespace', name)
}

export async function createPhysicalNamespace(name) {
  if (!name) throw new ERROR.InvalidArgumentError('name', name)

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  try {
    await helper.createPhysicalNamespaceRaw(tailsRootDir, name)
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new ERROR.AlreadyExistsError('name', name)
    }
    throw new Error(err)
  }
}

export async function deletePhysicalNamespace(name) {
  if (!name) throw new ERROR.InvalidArgumentError('name', name)

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  try {
    await helper.deletePhysicalNamespaceRaw(tailsRootDir, name)
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new ERROR.DoesNotExistError('name', name)
    }
    throw new Error(err)
  }
}

export class PhysicalNamespace {
  static list() {
    return listPhysicalNamespaces()
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
