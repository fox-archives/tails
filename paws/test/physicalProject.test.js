import path from 'path'

import _ from 'lodash'

import {
  listPhysicalProject,
  showPhysicalProject
} from '../services/physicalProjectService'

const projectDir = path.join(__dirname, 'fixtures/read-test')

describe('physicalProjectService', () => {
  test('physicalProject lists properly', async () => {
    const projects = await listPhysicalProject(projectDir, {
      simple: true
    })

    expect(projects.sort()).toStrictEqual(
      [
        'project-alfa',
        'project-bravo',
        'project-charlie',
        'project-one',
        'project-three',
        'project-two'
      ].sort()
    )
  })

  test('physicalProject shows properly', async () => {
    const projectName = 'project-one'
    const project = await showPhysicalProject(projectDir, projectName, {
      simple: true
    })

    expect(project).toBe(projectName)
  })

  test('physicalProject shows properly in subfolder', async () => {
    const projectName = 'project-alfa'
    const project = await showPhysicalProject(projectDir, projectName, {
      simple: true
    })

    expect(project).toBe(projectName)
  })

  test('physicalProject shows properly not simple', async () => {
    const projectName = 'project-two'
    const project = await showPhysicalProject(projectDir, projectName, {
      simple: false
    })

    expect(project).toStrictEqual({
      isBlockDevice: false,
      isCharacterDevice: false,
      isDirectory: true,
      isFIFO: false,
      isFile: false,
      isSocket: false,
      isSymbolicLink: false,
      name: projectName
    })
  })

  test('physicalProject shows properly in subfolder not simple', async () => {
    const projectName = 'project-charlie'
    const project = await showPhysicalProject(projectDir, projectName, {
      simple: false
    })

    expect(project).toStrictEqual({
      isBlockDevice: false,
      isCharacterDevice: false,
      isDirectory: true,
      isFIFO: false,
      isFile: false,
      isSocket: false,
      isSymbolicLink: false,
      name: projectName
    })
  })
})
