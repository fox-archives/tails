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

export async function showPhysicalNamespace(namespace?: string) {
  if (!namespace) throw new ERROR.InvalidArgumentError('namespace', namespace)

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  let dirents
  try {
    dirents = await readDirRaw(tailsRootDir)
  } catch (err) {
    throw new Error(`failed to read directory '${tailsRootDir}'`)
  }

  for (let dirent of dirents) {
    if (!(dirent.name.slice(0, 1) === '_')) continue

    if (dirent.name.slice(1) === namespace) {
      return {
        name: dirent.name.slice(1),
        isDirectory: true,
        isFile: false,
        isSymbolicLink: false,
      }
    }
  }

  throw new ERROR.DoesNotExistError('namespace', namespace)
}

export async function createPhysicalNamespace(namespace: string) {
  if (!namespace) throw new ERROR.InvalidArgumentError('namespace', namespace)

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  try {
    await helper.createPhysicalNamespaceRaw(tailsRootDir, namespace)
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new ERROR.AlreadyExistsError('namespace', namespace)
    }
    throw new Error(err)
  }
}

export async function deletePhysicalNamespace(namespace: string) {
  if (!namespace) throw new ERROR.InvalidArgumentError('namespace', namespace)

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  try {
    await helper.deletePhysicalNamespaceRaw(tailsRootDir, namespace)
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new ERROR.DoesNotExistError('namespace', namespace)
    }
    throw new Error(err)
  }
}

// export class PhysicalNamespace {
//   public static list() {
//     return listPhysicalNamespaces()
//   }

//   public static show(namespace: string) {
//     return showPhysicalNamespace(namespace)
//   }

//   public static create(namespace: string) {
//     return createPhysicalNamespace(namespace)
//   }

//   public static delete(namespace: string) {
//     return deletePhysicalNamespace(namespace)
//   }
// }
