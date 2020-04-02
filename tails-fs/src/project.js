import { Config } from './config'
import * as ERROR from './errors'
import { getNamespaceFolder, doesNamespaceExist } from './util'
import * as helper from './project.helper'

const TAILS_ROOT_DIR = 'TAILS_ROOT_DIR'

export async function listPhysicalProject(namespace) {
  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  if (!namespace) return helper.gatherProjects(tailsRootDir, () => true)

  const namespaceFolder = getNamespaceFolder(tailsRootDir, namespace)
  console.log(namespaceFolder)
  return helper.gatherProjects(namespaceFolder, () => true)
}

export async function showPhysicalProject(name, namespace) {
  if (!name) throw new ERROR.InvalidArgumentError('name')

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  let project = await helper.pickProject(tailsRootDir, (dirent) => {
    return dirent.name === name
  })
  if (project) return project

  throw new ERROR.DoesNotExistError('name')
}

export async function createPhysicalProject(name, namespace) {
  if (!name) throw new ERROR.InvalidArgumentError('name')

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  if (namespace && !(await doesNamespaceExist(tailsRootDir, namespace))) {
    throw new ERROR.DoesNotExistError('namespace')
  }

  try {
    await helper.createPhysicalProjectRaw(tailsRootDir, {
      namespace,
      projectName: name,
    })
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(err)
      throw new ERROR.AlreadyExistsError('name')
    } else {
      throw new Error(err)
    }
  }
}

export async function deletePhysicalProject(name, namespace) {
  if (!name) throw new ERROR.InvalidArgumentError('name')

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  try {
    await helper.deletePhysicalProjectRaw(tailsRootDir, {
      namespace,
      projectName: name,
    })
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new ERROR.DoesNotExistError('name')
    }
    throw new Error(err)
  }
}

export class PhysicalProject {
  static list(namespace) {
    return listPhysicalProject(namespace)
  }

  static show(name, namespace) {
    return showPhysicalProject(name, namespace)
  }

  static create(name, namespace) {
    return createPhysicalProject(name, namespace)
  }

  static delete(name, namespace) {
    return deletePhysicalProject(name, namespace)
  }
}
