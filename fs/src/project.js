import {
  InvalidArgumentError,
  AlreadyExistsError,
  DoesNotExistError
} from './util/errors'
import { getNamespaceFolder, gatherProjects, pickProject } from './util'

// TODO: option to list within namespace
export async function listPhysicalProject(projectDir, {
  namespace
}) {
  if (!namespace) return gatherProjects(projectDir, () => true)

  const namespaceFolder = getNamespaceFolder(projectDir, namespace)

  

}

export async function showPhysicalProject(projectDir, args = {}) {
  if (!args.name) throw InvalidArgumentError("'name' property missing")

  let project = await pickProject(projectDir, dirent => {
    return dirent.name === args.name
  })
  if (project) return project

  throw new DoesNotExistError()
}

// todo: implement namespaces first
export async function createPhysicalProject(projectDir, args = {}) {
  if (!args.name) throw InvalidArgumentError("'name' property missing")

  let project = await pickProject(projectDir, dirent => {
    return dirent.name === args.name
  })
  if (project) throw new PhysicalProjectAlreadyExistsError()

  
  // if (args.namespace) {
  // }
}

export async function deletePhysicalProject(projectDir, args = {}) {
  if (!args.name) throw InvalidArgumentError("'name' property missing")
}

export async function mutatePhysicalProject(projectDir, args = {}) {
  if (!args.name) throw InvalidArgumentError("'name' property missing")
  if (!args.present) throw InvalidArgumentError("'present' property missing")
}
