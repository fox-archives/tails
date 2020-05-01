import fs from 'fs-extra'

import _ from 'lodash'

import { fixNamespaceFixtures } from './testUtils'
import * as TC from './testConstants'

// TODO: fix
import * as testUtilForType from './testUtils'
import * as namespaceMethods from '../namespace'
// import { PhysicalNamespace as PhysicalNameSpaceForType } from '../namespace'
import {
  DoesNotExistError as DoesNotExistErrorForType,
  AlreadyExistsError as AlreadyExistsErrorForType,
  InvalidArgumentError as InvalidArgumentErrorForType,
} from '../errors'
interface tailsErrorForType {
  DoesNotExistError: DoesNotExistErrorForType
  AlreadyExistsError: AlreadyExistsErrorForType
  InvalidArgumentError: InvalidArgumentErrorForType
}

/*
  i would prefer to keep testUtil and TAILS_ERROR static imports, but
  testUtil has a side effect of indirectly importing '../config.helper'
  (by importing '../config') and not dynamically importing TAILS_ERROR
  results in two different instances of each error being passed around
  (which, ex. causes expected DoesNotExistError does not match received
  DoesNotExistError)
*/
// let PhysicalNamespace: PhysicalNameSpaceForType
let Namespace: typeof namespaceMethods
let TAILS_ERROR: tailsErrorForType
let testUtil: typeof testUtilForType

beforeEach(() => {
  jest.resetModules()
  jest.doMock('../config.helper')
  // ;({ PhysicalNamespace } = require('../namespace'))
  Namespace = require('../namespace')
  TAILS_ERROR = require('../errors')
  testUtil = require('./testUtils')
})

describe('PhysicalNamespace.list()', () => {
  // TODO: unskip
  it.skip('succeeds on correct arguments', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_READ,
    })

    // let obj = await PhysicalNamespace.list()
    let obj = await Namespace.listPhysicalNamespaces()

    expect(obj.namespaces).toStrictEqual(
      _.sortBy([
        {
          name: 'project-grouping',
          isDirectory: true,
          isFile: false,
          isSymbolicLink: false,
        },
        {
          name: 'project-grouping-2',
          isDirectory: true,
          isFile: false,
          isSymbolicLink: false,
        },
      ])
    ),
      'name'
  })

  it('fails on invalid TAILS_ROOT_DIR by throwing Error', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: 'invalid-namespace-folder-abc-xyz',
    })

    // await expect(PhysicalNamespace.list()).rejects.toThrow(Error)
    await expect(Namespace.listPhysicalNamespaces()).rejects.toThrow(Error)
  })
})

describe('PhysicalNamespace.show()', () => {
  it('succeeds on correct arguments', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_READ,
    })

    const name = 'project-grouping'
    // const namespace = await PhysicalNamespace.show(name)
    const namespace = await Namespace.showPhysicalNamespace(name)

    expect(namespace).toStrictEqual({
      name,
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false,
    })
  })

  it('fails on non-existing namespace by throwing DoesNotExistError', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_READ,
    })

    const invalid = 'non-existent-namespace-abc'
    // await expect(PhysicalNamespace.show(invalid)).rejects.toThrow(
    //   TAILS_ERROR.DoesNotExistError
    // )
    await expect(Namespace.showPhysicalNamespace(invalid)).rejects.toThrow(
      TAILS_ERROR.DoesNotExistError
    )
  })

  it('fails on invalid TAILS_ROOT_DIR by throwing Error', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: 'invalid',
    })

    // await expect(PhysicalNamespace.show()).rejects.toThrow(Error)
    await expect(Namespace.showPhysicalNamespace()).rejects.toThrow(Error)
  })
})

describe('PhysicalNamespace.create()', () => {
  beforeAll(fixNamespaceFixtures)
  afterEach(fixNamespaceFixtures)

  it('succeeds on correct arguments', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_WRITE,
    })

    const namespace = 'namespace-foo'

    // await expect(PhysicalNamespace.create(namespace)).resolves.not.toThrow()
    await expect(
      Namespace.createPhysicalNamespace(namespace)
    ).resolves.not.toThrow()
  })

  it('fails on invalid arguments by throwing InvalidArgumentError', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_WRITE,
    })

    // await expect(PhysicalNamespace.create()).rejects.toThrow(
    //   TAILS_ERROR.InvalidArgumentError
    // )
    // @ts-ignore
    await expect(Namespace.createPhysicalNamespace()).rejects.toThrow(
      TAILS_ERROR.InvalidArgumentError
    )
  })

  it('fails on already existing namespace by throwing AlreadyExistsError', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_WRITE,
    })

    const namespace = 'project-collection'

    await expect(Namespace.createPhysicalNamespace(namespace)).rejects.toThrow(
      TAILS_ERROR.AlreadyExistsError
    )
  })

  it('fails on invalid TAILS_ROOT_DIR by throwing Error', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: 'invalid-namespace-folder-abc-xyz',
    })

    await expect(
      Namespace.createPhysicalNamespace('doesnnt-matter')
    ).rejects.toThrow(Error)
  })
})

describe('deletePhysicalNamespace', () => {
  beforeAll(fixNamespaceFixtures)
  afterEach(fixNamespaceFixtures)

  it('succeeds on correct arguments', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_WRITE,
    })

    const namespace = 'project-collection'

    await expect(
      Namespace.deletePhysicalNamespace(namespace)
    ).resolves.not.toThrow()
  })

  it('fails on not enough arguments by throwing InvalidArgumentError', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_WRITE,
    })

    // @ts-ignore
    await expect(Namespace.deletePhysicalNamespace()).rejects.toThrow(
      TAILS_ERROR.InvalidArgumentError
    )
  })

  it('fails on non-existing namespace by throwing DoesNotExistError', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: TC.TEST_TAILS_ROOT_DIR_WRITE,
    })

    const invalid = 'non-existent-abc'

    await expect(Namespace.deletePhysicalNamespace(invalid)).rejects.toThrow(
      TAILS_ERROR.DoesNotExistError
    )
  })

  it('fails on invalid TAILS_ROOT_DIR by throwing Error', async () => {
    await testUtil.setConfig({
      TAILS_ROOT_DIR: 'invalid-namespace-folder-abc-xyz',
    })

    await expect(
      Namespace.deletePhysicalNamespace('doesnt-matter')
    ).rejects.toThrow(Error)
  })
})
