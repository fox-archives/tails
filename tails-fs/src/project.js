import { Config } from './config'
import * as ERROR from './errors'
import { getNamespaceFolder, doesNamespaceExist } from './util'
import * as helper from './project.helper'

const TAILS_ROOT_DIR = 'TAILS_ROOT_DIR'

/* if namespace is not present, list projects in *all* namespaces */
export async function listPhysicalProject(namespace) {
  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  if (!namespace) return helper.gatherProjects(tailsRootDir, () => true)

  const namespaceFolder = getNamespaceFolder(tailsRootDir, namespace)
  return helper.gatherProjects(namespaceFolder, () => true)
}

export async function showPhysicalProject(project, namespace) {
  if (!project) throw new ERROR.InvalidArgumentError('project', project)

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

  let projectObject = await helper.pickProject(tailsRootDir, (dirent) => {
    return dirent.name === project
  })
  if (projectObject) return projectObject

  throw new ERROR.DoesNotExistError('project', project)
}

export async function createPhysicalProject(project, namespace) {
  if (!project) throw new ERROR.InvalidArgumentError('project', project)
  if (project.indexOf('_') === 0)
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

export async function deletePhysicalProject(project, namespace) {
  if (!project) throw new ERROR.InvalidArgumentError('project', project)

  const tailsRootDir = await Config.get(TAILS_ROOT_DIR)

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

export class PhysicalProject {
  static list(namespace) {
    return listPhysicalProject(namespace)
  }

  static show(project, namespace) {
    return showPhysicalProject(project, namespace)
  }

  static create(project, namespace) {
    return createPhysicalProject(project, namespace)
  }

  static delete(project, namespace) {
    return deletePhysicalProject(project, namespace)
  }
}
