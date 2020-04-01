import { Config } from './config'
import * as ERROR from './errors'
import {
  getNamespaceFolder,
  doesNamespaceExist,
  createPhysicalProjectRaw,
  gatherProjects,
  pickProject,
  deletePhysicalProjectRaw,
} from './util'

const TAILS_ROOT_DIR = 'TAILS_ROOT_DIR'

export async function listPhysicalProject(namespace) {
  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  if (!namespace) return gatherProjects(tailsRootDir, () => true)

  const namespaceFolder = getNamespaceFolder(tailsRootDir, namespace)
  console.log(namespaceFolder)
  return gatherProjects(namespaceFolder, () => true)
}

export async function showPhysicalProject(name, namespace) {
  if (!name) throw new ERROR.InvalidArgumentError('name')

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  let project = await pickProject(tailsRootDir, (dirent) => {
    return dirent.name === name
  })
  if (project) return project

  throw new ERROR.DoesNotExistError('name')
}

export async function createPhysicalProject(name, namespace) {
  if (!name) throw new ERROR.InvalidArgumentError('name')

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  if (namespace && !(await doesNamespaceExist(tailsRootDir, namespace))) {
    throw new DoesNotExistError('namespace')
  }

  try {
    await createPhysicalProjectRaw(tailsRootDir, {
      namespace: namespace,
      projectName: name,
    })
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.error(err)
      throw new ERROR.DoesNotExistError(
        `${__dirname}: failed to create project at '${name}' in namespace '${namespace}'`
      )
    }

    throw new Error(
      `unknown error occurred when creating physicalProject at projectDir '${namespace}' in namespace ${namespace}`
    )
  }
}

export async function deletePhysicalProject(name, namespace) {
  if (!name) throw new ERROR.InvalidArgumentError('name')

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  try {
    await deletePhysicalProjectRaw(tailsRootDir, {
      namespace,
      projectName: name,
    })
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new ERROR.DoesNotExistError('name')
    }
    throw new Error(
      `${__dirname}: an unknown error occurred when trying to deletePhysicalProject '${name}' in namespace '${namespace}`
    )
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
