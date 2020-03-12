import path from 'path'

import _ from 'lodash'

import { $ } from '../../src/config'
import { listNamespace, showNamespace } from '../../src/services/namespaceService'
import {
  StorageReadError,
  NamespaceNotFoundError
} from '../../src/util/errors'

const CORRECT_META_DIR = path.join($, './test/fixtures/read-test')
const CORRECT_NAMESPACE_DIR = 'project-grouping'

describe('listNamespace', () => {
  it('lists all namespaces parameters', async () => {
    let namespaces = await listNamespace(CORRECT_META_DIR)

    expect(namespaces).toStrictEqual(_.sortBy([
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
    ]), 'name')
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

    await expect(showNamespace(invalid, {
      name: CORRECT_NAMESPACE_DIR
    })).rejects.toThrow(StorageReadError)
  })
})

describe('createNamespace', () => {
  // it('creates namespace successfully with no errors', async () => {
    
  // })
})
