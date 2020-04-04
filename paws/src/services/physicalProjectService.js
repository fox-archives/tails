import {
  PhysicalProjectNotFoundError,
  InvalidArgumentError,
  PhysicalProjectAlreadyExistsError,
} from '../util/errors'
import { gatherProjects, pickProject } from '../util'

export async function listPhysicalProject(projectDir) {
  return gatherProjects(projectDir, () => true)
}

export async function showPhysicalProject(projectDir, args = {}) {
  if (!args.name) throw InvalidArgumentError("'name' property missing")

  let project = await pickProject(projectDir, (dirent) => {
    return dirent.name === args.name
  })
  if (project) return project

  throw new PhysicalProjectNotFoundError()
}

// todo: implement namespaces first
export async function createPhysicalProject(projectDir, args = {}) {
  if (!args.name) throw InvalidArgumentError("'name' property missing")

  let project = await pickProject(projectDir, (dirent) => {
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
