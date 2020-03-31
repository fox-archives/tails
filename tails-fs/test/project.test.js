import path from 'path'

import _ from 'lodash'

import { $ } from '../src/constants'
import * as C from './constants'
import {
  InvalidArgumentError,
  AlreadyExistsError,
  DoesNotExistError
} from '../src/util/errors'
import {
  listPhysicalProject,
  showPhysicalProject,
  createPhysicalProject,
  deletePhysicalProject
} from '../src/project'
import { deletePhysicalProjectRaw } from '../src/util'

// mixture of `read-test` and `write-test` "correct" values
const CORRECT_PROJECT_DIR = 'project-three'
const CORRECT_PROJECT_SUBDIR = 'project-bravo'
const CORRECT_NAMESPACE_WRITE = 'project-collection-2'

describe('listProject', () => {
  it('success on correct arguments', async () => {
    let projects = await listPhysicalProject(C.TAILS_PROJECT_DIR_READ, {})

    expect(_.sortBy(projects, 'name')).toStrictEqual(C.PROJECTS_FIXTURE)
  })

  it('failure on invalid project directory by throwing Error (1)', async () => {
    const invalid = path.join($, 'src/test/fixtures/fake-read-test')
    await expect(listPhysicalProject(invalid)).rejects.toThrow(Error)
  })

  it('failure on invalid project directory by throwing Error (2)', async () => {
    const invalid = 'invalid-namespace-folder-abc-xyz'
    await expect(listPhysicalProject(invalid)).rejects.toThrow(Error)
  })
})

describe('showPhysicalProject', () => {
  it('success on correct arguments (project exists at root)', async () => {
    const project = await showPhysicalProject(C.TAILS_PROJECT_DIR_READ, {
      name: CORRECT_PROJECT_DIR
    })

    expect(project).toStrictEqual({
      name: CORRECT_PROJECT_DIR,
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    })
  })

  it('success on correct arguments (project exists in subfolder)', async () => {
    const project = await showPhysicalProject(C.TAILS_PROJECT_DIR_READ, {
      name: CORRECT_PROJECT_SUBDIR
    })

    expect(project).toStrictEqual({
      name: CORRECT_PROJECT_SUBDIR,
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    })
  })

  it('fails on invalid projectName by throwing DoesNotExistError', async () => {
    const invalid = 'invalid-project-name-abc-xyz'
    await expect(
      showPhysicalProject(C.TAILS_PROJECT_DIR_READ, {
        name: invalid
      })
    ).rejects.toThrow(DoesNotExistError)
  })

  it('fails on invalid directory location by throwing Error', async () => {
    const invalid = 'invalid-project-dir-abc-xyz'
    await expect(
      showPhysicalProject(invalid, {
        name: C.TAILS_PROJECT_DIR_READ
      })
    ).rejects.toThrow(Error)
  })
})

describe('createPhysicalProject', () => {
  it('succeeds on correct parameters (no namespace)', async () => {
    const correct = 'some-physical-project'
    await expect(createPhysicalProject(C.TAILS_PROJECT_DIR_WRITE, {
      name: correct
    })).resolves.not.toThrow()
  })

  it('succeeds on correct parameters (with namespace)', async () => {
    const correct = 'name-does-not-matter'
    await expect(createPhysicalProject(C.TAILS_PROJECT_DIR_WRITE, {
      namespace: CORRECT_NAMESPACE_WRITE,
      name: correct
    })).resolves.not.toThrow()
  })

  it('fails on incorrect (non-existing) namespace by throwing DoesNotExistError', async () => {
    const invalidNamespace = 'project-collection-200'
    const correctProjectName = 'name-does-not-matter'
    await expect(
      createPhysicalProject(C.TAILS_PROJECT_DIR_WRITE, {
        namespace: invalidNamespace,
        name: correctProjectName
      })
    ).rejects.toThrow(DoesNotExistError)
  })
})

describe('deletePhysicalProject', () => {
  it('succeeds on correct parameters (no namespace)', async () => {
    const correct = 'project-first'
    await expect(
      deletePhysicalProject(C.TAILS_PROJECT_DIR_WRITE, {
        name: correct
      })
    ).resolves.not.toThrow()
  })
})
