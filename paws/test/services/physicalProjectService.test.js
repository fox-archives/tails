import path from 'path'

import _ from 'lodash'

import { $ } from '../../src/config'
import {
  listPhysicalProject,
  showPhysicalProject
} from '../../src/services/physicalProjectService'

const CORRECT_META_DIR = path.join($, './test/fixtures/read-test')
const CORRECT_PROJECT_DIR = 'project-one'
const CORRECT_PROJECT_SUBDIR = 'project-alfa'
const PROJECTS_FIXTURE = _.sortBy(
  [
    {
      name: 'project-alfa',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    },
    {
      name: 'project-bravo',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    },
    {
      name: 'project-charlie',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    },
    {
      name: 'project-one',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    },
    {
      name: 'project-three',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    },
    {
      name: 'project-two',
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    }
  ],
  'name'
)

describe('listPhysicalProject', () => {
  test('lists all projects properly', async () => {
    let projects = await listPhysicalProject(CORRECT_META_DIR, {})

    projects = _.sortBy(projects, 'name')
    expect(projects).toStrictEqual(PROJECTS_FIXTURE)
  })

  test('lists all projects properly with no option passed', async () => {
    let projects = await listPhysicalProject(CORRECT_META_DIR)

    projects = _.sortBy(projects, 'name')
    expect(projects).toStrictEqual(PROJECTS_FIXTURE)
  })

  test('throws on invalid project directory', async () => {
    const invalid = path.join($, 'src/test/fixtures/fake-read-test')
    await expect(listPhysicalProject(invalid, {})).rejects.toThrow()
  })

  test('throws on invalid project directory 2', async () => {
    const invalid = '/'
    await expect(listPhysicalProject(invalid, {})).rejects.toThrow()
  })
})

describe('showPhysicalProject', () => {
  test('returns correct data with', async () => {
    const project = await showPhysicalProject(CORRECT_META_DIR, {
      name: CORRECT_PROJECT_DIR
    })

    expect(project).toStrictEqual({
      name: CORRECT_PROJECT_DIR,
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    })
  })

  test('returns correct data for a subfolder', async () => {
    const project = await showPhysicalProject(CORRECT_META_DIR, {
      name: CORRECT_PROJECT_SUBDIR
    })

    expect(project).toStrictEqual({
      name: CORRECT_PROJECT_SUBDIR,
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    })
  })

  test('throws when we pass with invalid projectName', async () => {
    const invalid = 'invalid-project-name-abc-xyz'
    await expect(
      showPhysicalProject(CORRECT_META_DIR, {
        name: invalid
      })
    ).rejects.toThrow()
  })

  test('throws when we send invalid projectDir', async () => {
    const invalid = 'invalid-project-dir-abc-xyz'
    await expect(
      showPhysicalProject(invalid, {
        name: CORRECT_PROJECT_DIR
      })
    ).rejects.toThrow()
  })
})
