import { Config } from './config'
import * as ERROR from './errors'
import { getNamespaceFolder, doesNamespaceExist } from './util'
import * as helper from './project.helper'

const TAILS_ROOT_DIR = 'TAILS_ROOT_DIR'

/**
 * this is meant to be a low level api (ex. it throws errors, that even if they could be dealt with on their own, aren't)
 *
 * ```js
 * import { TAILS_CONFIG_FILE, TAILS_ERROR } from 'tails-fs'
 * ```
 */

/**
 * lists all physical projects. if namespace is not present, it lists the projects in _all_ namespaces
 * @throws InvalidArgumentError (err.category = project)
 * @throws DoesNotExistError (err.category as project)
 * @throws Error
 */
export async function listPhysicalProject(namespace?: string) {
  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  if (namespace && !(await doesNamespaceExist(tailsRootDir, namespace))) {
    throw new ERROR.DoesNotExistError('namespace', namespace)
  }

  if (!namespace) return helper.gatherProjects(tailsRootDir, () => true)

  const namespaceFolder = getNamespaceFolder(tailsRootDir, namespace)
  return helper.gatherProjects(namespaceFolder, () => true)
}

/**
 * show a project
 *
 * @throws InvalidArgumentError (err.category = project)
 * @throws DoesNotExistError (err.category = project)
 * @throws Error
 */
export async function showPhysicalProject(project: string, namespace?: string) {
  if (!project) throw new ERROR.InvalidArgumentError('project', project)

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)
  let searchDirectory
  if (namespace) {
    if (!(await doesNamespaceExist(tailsRootDir, namespace))) {
      throw new ERROR.DoesNotExistError('namespace', namespace)
    }
    searchDirectory = getNamespaceFolder(tailsRootDir, namespace)
  } else {
    searchDirectory = tailsRootDir
  }

  let projectObject = await helper.pickProject(searchDirectory, project)

  if (projectObject) return projectObject

  throw new ERROR.DoesNotExistError('project', project)
}

/**
 * create a project
 *
 * @throws InvalidArgumentError (err.category = project)
 * @throws DoesNotExistError (err.category = namespace)
 * @throws AlreadyExistsError (err.category = project)
 * @throws Error
 */
export async function createPhysicalProject(
  project: string,
  namespace?: string
) {
  if (!project) throw new ERROR.InvalidArgumentError('project', project)
  if (helper.isNamespace(project))
    throw new ERROR.InvalidArgumentError(
      'project',
      project,
      'project names cannot start with an underscore'
    )

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  if (namespace && !(await doesNamespaceExist(tailsRootDir, namespace))) {
    throw new ERROR.DoesNotExistError('namespace', namespace)
  }

  try {
    await helper.createPhysicalProjectRaw(tailsRootDir, {
      namespace,
      projectName: project,
    })
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new ERROR.AlreadyExistsError('project', project)
    } else {
      throw new Error(err)
    }
  }
}

/**
 * delete a project folder
 *
 * @throws InvalidArgumentError (err.category = project)
 * @throws DoesNotExistError (err.category = project)
 * @throws Error
 */
export async function deletePhysicalProject(
  project: string,
  namespace?: string
) {
  if (!project) throw new ERROR.InvalidArgumentError('project', project)

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  if (namespace && !(await doesNamespaceExist(tailsRootDir, namespace))) {
    throw new ERROR.DoesNotExistError('namespace', namespace)
  }

  try {
    await helper.deletePhysicalProjectRaw(tailsRootDir, {
      namespace,
      projectName: project,
    })
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new ERROR.DoesNotExistError('project', project)
    }
    throw new Error(err)
  }
}

// export class PhysicalProject {
//   static list(namespace?: string) {
//     return listPhysicalProject(namespace)
//   }

//   static show(project: string, namespace?: string) {
//     return showPhysicalProject(project, namespace)
//   }

//   static create(project: string, namespace?: string) {
//     return createPhysicalProject(project, namespace)
//   }

//   static delete(project: string, namespace?: string) {
//     return deletePhysicalProject(project, namespace)
//   }
// }
