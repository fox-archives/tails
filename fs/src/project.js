import {
  InvalidArgumentError,
  AlreadyExistsError,
  DoesNotExistError
} from './util/errors'
import {
  getNamespaceFolder,
  doesNamespaceExist,
  createPhysicalProjectRaw,
  gatherProjects,
  pickProject,
  deletePhysicalProjectRaw
} from './util'

// TODO: option to list within namespace
export async function listPhysicalProject(projectDir, { namespace }) {
  if (!namespace) return gatherProjects(projectDir, () => true)

  const namespaceFolder = getNamespaceFolder(projectDir, namespace)

  return gatherProjects(namespaceFolder, () => true)
}

export async function showPhysicalProject(projectDir, args = {}) {
  if (!args.name) throw InvalidArgumentError("'name' property missing")

  let project = await pickProject(projectDir, dirent => {
    return dirent.name === args.name
  })
  if (project) return project

  throw new DoesNotExistError()
}

export async function createPhysicalProject(projectDir, args = {}) {
  if (!args.name) throw InvalidArgumentError("'name' property missing")
  
  if(args.namespace && !(await doesNamespaceExist(projectDir, args.namespace))) {
    throw new DoesNotExistError(`namespace ${args.namespace} does not exist. create it before creating a project in it`)
  }
  try {
    await createPhysicalProjectRaw(projectDir, {
      namespace: args.namespace,
      projectName: args.name
    })
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.error(err)
      throw new DoesNotExistError(
        `${__dirname}: failed to create project at '${args.name}' in namespace '${args.namespace}'`
      )
    }

    throw new Error(
      `unknown error occurred when creating physicalProject at projectDir '${args.namespace}' in namespace ${args.namespace}`
    )
  }
}

export async function deletePhysicalProject(projectDir, args = {}) {
  if (!args.name) throw InvalidArgumentError("'name' property missing")

  try {
    await deletePhysicalProjectRaw(projectDir, {
      namespace: args.namespace,
      projectName: args.name
    })
  } catch (err) {
    console.error(err)
    if (err.code === 'ENOENT') {
      throw new DoesNotExistError(
        `physicalProject '${args.name}' in namespace '${args.namespace}' does not exist`
      )
    }
    throw new Error(`${__dirname}: an unknown error occurred when trying to deletePhysicalProject '${args.name}' in namespace '${args.namespace}`)
  }
}
