import path from 'path'

import _ from 'lodash'

import { $ } from '../src/config'
import * as C from './constants'
import {
  StorageReadError,
  PhysicalProjectNotFoundError,
} from '../src/util/errors'
import {
  listPhysicalProject,
  showPhysicalProject
} from '../src/project'

const CORRECT_PROJECT_DIR = 'project-three'
const CORRECT_PROJECT_SUBDIR = 'project-bravo'

describe('listPhysicalProject', () => {
  it('lists all projects properly', async () => {
    let projects = await listPhysicalProject(C.TAILS_PROJECT_DIR_READ, {})

    projects = _.sortBy(projects, 'name')
    expect(projects).toStrictEqual(C.PROJECTS_FIXTURE)
  })

  it('throws StorageReadError on invalid project directory', async () => {
    const invalid = path.join($, 'src/test/fixtures/fake-read-test')
    await expect(listPhysicalProject(invalid)).rejects.toThrow(
      StorageReadError
    )
  })

  it('throws StorageReadError on invalid project directory', async () => {
    const invalid = '/invalid'
    await expect(listPhysicalProject(invalid)).rejects.toThrow()
  })
})

describe('showPhysicalProject', () => {
  it('returns correct data with', async () => {
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

  it('returns correct data for a subfolder', async () => {
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

  it('throws PhysicalProjectNotFoundError when passing invalid projectName', async () => {
    const invalid = 'invalid-project-name-abc-xyz'
    await expect(
      showPhysicalProject(C.TAILS_PROJECT_DIR_READ, {
        name: invalid
      })
    ).rejects.toThrow(PhysicalProjectNotFoundError)
  })

  // should be same variable as RUNTIME_CONFIG.TAILS_PROJECT_DIR
  it('throws StorageReadError when passing invalid project directory location', async () => {
    const invalid = 'invalid-project-dir-abc-xyz'
    await expect(
      showPhysicalProject(invalid, {
        name: C.TAILS_PROJECT_DIR_READ
      })
    ).rejects.toThrow(StorageReadError)
  })
})

// describe('createPhysicalProject', () => {
//   it('edits correct data', async () => {})
// })
