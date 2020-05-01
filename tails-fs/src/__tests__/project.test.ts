import _ from 'lodash'

import { fixNamespaceFixtures } from './testUtils'
import * as TC from './testConstants'

// TODO: fix lame imports
import * as testUtilForType from './testUtils'
import * as projectMethods from '../project'
// import { PhysicalNamespace as PhysicalNameSpaceForType } from '../namespace'
import { DoesNotExistError as DoesNotExistErrorForType, AlreadyExistsError as AlreadyExistsErrorForType, InvalidArgumentError as InvalidArgumentErrorForType } from '../errors'
interface tailsErrorForType {
  DoesNotExistError: DoesNotExistErrorForType,
  AlreadyExistsError: AlreadyExistsErrorForType,
  InvalidArgumentError: InvalidArgumentErrorForType
}

/*
  see comment in
  namespace.test.js for details
*/
// let PhysicalProject: typeof projectMethods
let Project: typeof projectMethods
let TAILS_ERROR: tailsErrorForType
let testUtil: typeof testUtilForType
beforeEach(() => {
  jest.resetModules()
  jest.doMock('../config.helper')
  // ;({ PhysicalProject } = require('../project'))
  Project = require('../project')
  TAILS_ERROR = require('../errors')
  testUtil = require('./testUtils')
})

describe('listProject', () => {
  it('success on correct arguments', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_READ,
    })

    let projects = await Project.listPhysicalProject()

    expect(_.sortBy(projects, 'name')).toStrictEqual(TC.PROJECTS_FIXTURE)
  })

  it('fails on invalid TAILS_ROOT_DIR by throwing Error', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: 'invalid',
    })

    await expect(Project.listPhysicalProject()).rejects.toThrow(Error)
  })
})

describe('showPhysicalProject', () => {
  it('success on correct arguments (no namespace)', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_READ,
    })

    let correct = 'project-three'
    const project = await Project.showPhysicalProject(correct)

    expect(project).toStrictEqual({
      name: correct,
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false,
    })
  })

  it('success on correct arguments (with namespace)', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_READ,
    })

    let correct = 'project-one'
    const project = await Project.showPhysicalProject(correct)

    expect(project).toStrictEqual({
      name: correct,
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false,
    })
  })

  it('fails on invalid projectName by throwing DoesNotExistError', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_READ,
    })

    const invalid = 'invalid-project-name-abc-xyz'
    await expect(Project.showPhysicalProject(invalid)).rejects.toThrow(
      TAILS_ERROR.DoesNotExistError
    )
  })

  it('fails on invalid TAILS_ROOT_DIR by throwing Error', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: 'invalid-project-dir-abc-xyz',
    })

    // @ts-ignore
    await expect(Project.showPhysicalProject()).rejects.toThrow(Error)
  })
})

describe('createPhysicalProject', () => {
  beforeAll(fixNamespaceFixtures)
  afterEach(fixNamespaceFixtures)

  it('succeeds on correct parameters (no namespace)', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_WRITE,
    })

    const correct = 'some-physical-project'
    await expect(Project.createPhysicalProject(correct)).resolves.not.toThrow()
  })

  it('succeeds on correct parameters (with namespace)', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_WRITE,
    })

    const correct = 'name-does-not-matter'
    await expect(
      Project.createPhysicalProject(correct, 'project-collection')
    ).resolves.not.toThrow()
  })

  it('fails on incorrect (non-existing) namespace by throwing DoesNotExistError', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_WRITE,
    })

    const invalidNamespace = 'project-collection-200'
    const correctProjectName = 'name-does-not-matter'
    await expect(
      Project.createPhysicalProject(invalidNamespace, correctProjectName)
    ).rejects.toThrow(TAILS_ERROR.DoesNotExistError)
  })

  it('fails on invalid TAILS_ROOT_DIR by throwing Error', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: 'invalid-project-dir-abc-xyz',
    })

    // @ts-ignore
    await expect(Project.createPhysicalProject()).rejects.toThrow(Error)
  })
})

describe('deletePhysicalProject', () => {
  beforeAll(fixNamespaceFixtures)
  afterEach(fixNamespaceFixtures)

  it('succeeds on correct parameters (no namespace)', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_WRITE,
    })

    const correct = 'project-first'
    await expect(Project.deletePhysicalProject(correct)).resolves.not.toThrow()
  })

  it('fails on invalid TAILS_ROOT_DIR by throwing Error', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: 'invalid-project-dir-abc-xyz',
    })

    // @ts-ignore
    await expect(Project.deletePhysicalProject()).rejects.toThrow(Error)
  })
})
