import path from 'path'
import fs from 'fs-extra'

import {
  DoesNotExistError,
  AlreadyExistsError,
  InvalidArgumentError
} from './util/errors'
import { readProjectDirRaw } from './util'

export async function listNamespace(projectDir) {
  let dirents = await readProjectDirRaw(projectDir)

  let namespaces = [];
  for(let dirent of dirents) {
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

export async function showNamespace(projectDir, args = {}) {
  if (!args.name) throw new InvalidArgumentError("'name' property missing")

  let dirents = await readProjectDirRaw(projectDir)

  for (let dirent of dirents) {
    if (!dirent.name.slice(0, 1) === '_') continue
     
    if (dirent.name.slice(1) === args.name) {
      return({
        name: dirent.name.slice(1),
        isDirectory: true,
        isFile: false,
        isSymbolicLink: false
      })
    }
  }
  
  throw new DoesNotExistError(`namespace ${args.name} not found`)
}

export async function createNamespace(projectDir, args = {}) {
  if (!args.name) throw new InvalidArgumentError("'name' property missing")
  
  const namespaceFolder = path.join(projectDir, `_${args.name}`)

  try {
    await fs.promises.mkdir(namespaceFolder, {
      mode: 0o755
    })
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new AlreadyExistsError(`namespace '${args.name}' already exists`)
    }
    throw new Error(`${__dirname} an unknown error occurred when trying to create namespace ${args.name}`)
  }
}

export async function deleteNamespace(projectDir, args = {}) {
  if (!args.name) throw new InvalidArgumentError("'name' property missing")

  const namespaceFolder = path.join(projectDir, `_${args.name}`)

  try {
    // we include the stat because fs.remove from fs-extra does not
    // error if the folder does not exist
    await fs.promises.stat(namespaceFolder)
    await fs.remove(namespaceFolder)
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new DoesNotExistError(`namespace '${args.name}' does not exist`)
    }
    console.error(err)
    throw new Error(`${__dirname}: an unknown error ocurred when trying to remove ${namespaceFolder}`)
  }
}
