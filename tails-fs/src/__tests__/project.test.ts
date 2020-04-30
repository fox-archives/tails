import _ from 'lodash'

import { fixNamespaceFixtures } from './testUtils'
import * as TC from './testConstants'

/*
  see comment in
  namespace.test.js for details
*/
let PhysicalProject
let TAILS_ERROR
let testUtil
beforeEach(() => {
  jest.resetModules()
  jest.doMock('../config.helper')
  ;({ PhysicalProject } = require('../project'))
  TAILS_ERROR = require('../errors')
  testUtil = require('./testUtils')
})

describe('listProject', () => {
  it('success on correct arguments', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_READ,
    })

    let projects = await PhysicalProject.list()

    expect(_.sortBy(projects, 'name')).toStrictEqual(TC.PROJECTS_FIXTURE)
  })

  it('fails on invalid TAILS_ROOT_DIR by throwing Error', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: 'invalid',
    })

    await expect(PhysicalProject.list()).rejects.toThrow(Error)
  })
})

describe('showPhysicalProject', () => {
  it('success on correct arguments (no namespace)', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_READ,
    })

    let correct = 'project-three'
    const project = await PhysicalProject.show(correct)

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

    let correct = 'project-bravo'
    const project = await PhysicalProject.show(correct)

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
    await expect(PhysicalProject.show(invalid)).rejects.toThrow(
      TAILS_ERROR.DoesNotExistError
    )
  })

  it('fails on invalid TAILS_ROOT_DIR by throwing Error', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: 'invalid-project-dir-abc-xyz',
    })

    await expect(PhysicalProject.show()).rejects.toThrow(Error)
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
    await expect(PhysicalProject.create(correct)).resolves.not.toThrow()
  })

  it('succeeds on correct parameters (with namespace)', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_WRITE,
    })

    const correct = 'name-does-not-matter'
    await expect(
      PhysicalProject.create(correct, 'project-collection-2')
    ).resolves.not.toThrow()
  })

  it('fails on incorrect (non-existing) namespace by throwing DoesNotExistError', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_WRITE,
    })

    const invalidNamespace = 'project-collection-200'
    const correctProjectName = 'name-does-not-matter'
    await expect(
      PhysicalProject.create(invalidNamespace, correctProjectName)
    ).rejects.toThrow(TAILS_ERROR.DoesNotExistError)
  })

  it('fails on invalid TAILS_ROOT_DIR by throwing Error', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: 'invalid-project-dir-abc-xyz',
    })

    await expect(PhysicalProject.create()).rejects.toThrow(Error)
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
    await expect(PhysicalProject.delete(correct)).resolves.not.toThrow()
  })

  it('fails on invalid TAILS_ROOT_DIR by throwing Error', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: 'invalid-project-dir-abc-xyz',
    })

    await expect(PhysicalProject.delete()).rejects.toThrow(Error)
  })
})
