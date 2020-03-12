import path from 'path'
import fs from 'fs-extra'

import _ from 'lodash'

import { $ } from '../../src/config'
import {
  listNamespace,
  showNamespace,
  createNamespace,
  deleteNamespace
} from '../../src/services/namespaceService'
import {
  StorageReadError,
  InvalidArgumentError,
  NamespaceNotFoundError,
  NamespaceAlreadyExistsError
} from '../../src/util/errors'

const CORRECT_META_DIR = path.join($, './test/fixtures/read-test')
const CORRECT_WRITE_TEST = path.join($, './test/fixtures/write-test')
const CORRECT_NAMESPACE_DIR = 'project-grouping'
let fixNamespaceFixtures = async () => {
  const src = path.join($, 'test/fixtures/write-test-copy')
  const dest = path.join($, 'test/fixtures/write-test')
  await fs.emptyDir(dest)
  await fs.copy(src, dest, {
    overwrite: true
  })
}

describe('listNamespace', () => {
  it('lists all namespaces parameters', async () => {
    let namespaces = await listNamespace(CORRECT_META_DIR)

    expect(namespaces).toStrictEqual(
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

  it('throws StorageReadError on invalid project directory', async () => {
    const invalid = '/invalid'
    await expect(listNamespace(invalid)).rejects.toThrow(StorageReadError)
  })
})

describe('showNamespace', () => {
  it('returns correct data with proper parameters', async () => {
    const namespace = await showNamespace(CORRECT_META_DIR, {
      name: CORRECT_NAMESPACE_DIR
    })

    expect(namespace).toStrictEqual({
      name: CORRECT_NAMESPACE_DIR,
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false
    })
  })

  it('throw NamespaceNotFoundError when passing invalid namespace', async () => {
    const invalid = 'non-existent-namespace-abc'
    await expect(
      showNamespace(CORRECT_META_DIR, {
        name: invalid
      })
    ).rejects.toThrow(NamespaceNotFoundError)
  })

  it('throw NamespaceStorageReadError when passing invalid project directory location', async () => {
    const invalid = 'invalid-namespace-folder-abc'

    await expect(
      showNamespace(invalid, {
        name: CORRECT_NAMESPACE_DIR
      })
    ).rejects.toThrow(StorageReadError)
  })
})

describe('createNamespace', () => {
  beforeAll(fixNamespaceFixtures)
  afterEach(fixNamespaceFixtures)

  it('creates namespace successfully', async () => {
    const namespace = 'namespace-foo'

    await expect(
      createNamespace(CORRECT_WRITE_TEST, {
        name: namespace
      })
    ).resolves.not.toThrow()
  })

  it('throws InvalidArgumentError if does not contain all arguments', async () => {
    await expect(createNamespace(CORRECT_WRITE_TEST)).rejects.toThrow(
      InvalidArgumentError
    )
  })

  it('throws NamespaceAlreadyExistsError when creating folder on invalid (already-existing) namespace', async () => {
    const namespace = 'project-collection'

    await expect(
      createNamespace(CORRECT_WRITE_TEST, {
        name: namespace
      })
    ).rejects.toThrow(NamespaceAlreadyExistsError)
  })
})

describe('deleteNamespace', () => {
  beforeAll(fixNamespaceFixtures)
  afterEach(fixNamespaceFixtures)

  it('deletes namespaces successfully', async () => {
    const namespace = 'project-collection'

    await expect(
      deleteNamespace(CORRECT_WRITE_TEST, {
        name: namespace
      })
    ).resolves.not.toThrow()
  })

  it('throws InvalidArgumentError if does not contain all arguments', async () => {
    await expect(deleteNamespace(CORRECT_WRITE_TEST)).rejects.toThrow(
      InvalidArgumentError
    )
  })

  it('throws NamespaceNotFoundError when creating folder on invalid (non-existing) namespace', async () => {
    const invalid = 'non-existent-abc'

    await expect(
      deleteNamespace(CORRECT_WRITE_TEST, {
        name: invalid
      })
    ).rejects.toThrow(NamespaceNotFoundError)
  })
})
