import path from 'path'
import fs from 'fs-extra'

import _ from 'lodash'

import { $ } from '../src/config'
import * as C from './constants'
import {
  listPhysicalNamespace,
  showPhysicalNamespace,
  createPhysicalNamespace,
  deletePhysicalNamespace
} from '../src/namespace'
import {
  DoesNotExistError,
  AlreadyExistsError,
  InvalidArgumentError
} from '../src/util/errors'

const CORRECT_NAMESPACE_DIR = 'project-grouping'

let fixNamespaceFixtures = async () => {
  const src = path.join($, 'test/fixtures/write-test-copy')
  const dest = path.join($, 'test/fixtures/write-test')
  await fs.emptyDir(dest)
  await fs.copy(src, dest)
}

let failsOnInvalidProjectDirectoryLocation = fn => {
  const invalid = 'invalid-namespace-folder-abc-xyz'

  return expect(
    fn(invalid, {
      name: CORRECT_NAMESPACE_DIR
    })
  ).rejects.toThrow(Error)
}

describe('listPhysicalNamespace', () => {
  it('success on correct arguments', async () => {
    let obj = await listPhysicalNamespace(C.TAILS_PROJECT_DIR_READ)

    expect(obj.namespaces).toStrictEqual(
      _.sortBy([
        {
          name: 'project-grouping',
          isDirectory: true,
          isFile: false,
          isSymbolicLink: false
        },
        {
          name: 'project-grouping-2',
          isDirectory: true,
          isFile: false,
          isSymbolicLink: false
        }
      ]),
      'name'
    )
  })

  it('fails on invalid project directory by throwing Error', async () => {
    const invalid = 'invalid-namespace-folder-abc-xyz'
    await expect(listPhysicalNamespace(invalid)).rejects.toThrow(Error)
  })
})

describe('showPhysicalNamespace', () => {
  it('succeeds on correct arguments', async () => {
    const namespace = await showPhysicalNamespace(C.TAILS_PROJECT_DIR_READ, {
      name: CORRECT_NAMESPACE_DIR
    })

    expect(namespace).toStrictEqual({
      name: CORRECT_NAMESPACE_DIR,
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    })
  })

  it('fails on non-existing namespace by throwing DoesNotExistError', async () => {
    const invalid = 'non-existent-namespace-abc'
    await expect(
      showPhysicalNamespace(C.TAILS_PROJECT_DIR_READ, {
        name: invalid
      })
    ).rejects.toThrow(DoesNotExistError)
  })

  it('fails on invalid project directory location by throwing Error', async () => {
    await failsOnInvalidProjectDirectoryLocation(showPhysicalNamespace)
  })
})

describe('createPhysicalNamespace', () => {
  beforeAll(fixNamespaceFixtures)
  afterEach(fixNamespaceFixtures)

  it('succeeds on correct arguments', async () => {
    const namespace = 'namespace-foo'

    await expect(
      createPhysicalNamespace(C.TAILS_PROJECT_DIR_WRITE, {
        name: namespace
      })
    ).resolves.not.toThrow()
  })

  it('fails on invalid arguments by throwing InvalidArgumentError', async () => {
    await expect(createPhysicalNamespace(C.TAILS_PROJECT_DIR_WRITE)).rejects.toThrow(
      InvalidArgumentError
    )
  })

  it('fails on already existing namespace by throwing AlreadyExistsError', async () => {
    const namespace = 'project-collection'

    await expect(
      createPhysicalNamespace(C.TAILS_PROJECT_DIR_WRITE, {
        name: namespace
      })
    ).rejects.toThrow(AlreadyExistsError)
  })

  it('tails on invalid project directory location by throwing Error', async () => {
    await failsOnInvalidProjectDirectoryLocation(createPhysicalNamespace)
  })
})

describe('deletePhysicalNamespace', () => {
  beforeAll(fixNamespaceFixtures)
  afterEach(fixNamespaceFixtures)

  it('succeeds on correct arguments', async () => {
    const namespace = 'project-collection'

    await expect(
      deletePhysicalNamespace(C.TAILS_PROJECT_DIR_WRITE, {
        name: namespace
      })
    ).resolves.not.toThrow()
  })

  it('fails on not enough arguments by throwing InvalidArgumentError', async () => {
    await expect(
      deletePhysicalNamespace(C.TAILS_PROJECT_DIR_WRITE)
    ).rejects.toThrow(InvalidArgumentError)
  })

  it('fails on non-existing namespace by throwing DoesNotExistError', async () => {
    const invalid = 'non-existent-abc'

    await expect(
      deletePhysicalNamespace(C.TAILS_PROJECT_DIR_WRITE, {
        name: invalid
      })
    ).rejects.toThrow(DoesNotExistError)
  })

  it('fails on invalid project directory location by throwing Error', async () => {
    await failsOnInvalidProjectDirectoryLocation(deletePhysicalNamespace)
  })
})
