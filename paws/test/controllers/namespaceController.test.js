import path from 'path'
import fs from 'fs-extra'

import _ from 'lodash'
import * as grpc from 'grpc'

import { $ } from '../../src/config'
import * as C from '../constants'
import {
  createGrpcConnection,
  initPawsConfig,
  namespaceClient,
} from './grpcConnection'

const CORRECT_NAMESPACE_DIR = 'project-collection'

let fixNamespaceFixtures = async () => {
  const src = path.join($, 'test/fixtures/write-test-copy')
  const dest = path.join($, 'test/fixtures/write-test')
  await fs.emptyDir(dest)
  await fs.copy(src, dest)
}

describe('listNamespaceGrpc', () => {
  beforeAll(async () => {
    await createGrpcConnection()
    await initPawsConfig(C.TAILS_PROJECT_DIR_READ)
  })

  it('correct listNamespace with correct parameters', (done) => {
    namespaceClient.listNamespace({}, (err, response) => {
      expect(err).toBeNull()
      expect(_.sortBy(response.namespaces, 'name')).toEqual(
        _.sortBy(
          [
            {
              name: 'project-grouping-2',
              isDirectory: true,
              isFile: false,
              isSymbolicLink: false,
            },
            {
              name: 'project-grouping',
              isDirectory: true,
              isFile: false,
              isSymbolicLink: false,
            },
          ],
          'name'
        )
      )
      done()
    })
  })
})

describe('showNamespaceGrpc', () => {
  beforeAll(async () => {
    await createGrpcConnection()
    await initPawsConfig(C.TAILS_PROJECT_DIR_WRITE)
  })

  it('shows a namespace properly', (done) => {
    namespaceClient.showNamespace(
      {
        name: CORRECT_NAMESPACE_DIR,
      },
      (err, response) => {
        expect(err).toBeNull()
        expect(response).toStrictEqual({
          name: CORRECT_NAMESPACE_DIR,
          isDirectory: true,
          isFile: false,
          isSymbolicLink: false,
        })
        done()
      }
    )
  })

  it('fails with invalid arguments', (done) => {
    namespaceClient.showNamespace({}, (err, response) => {
      expect(err).toBeInstanceOf(Error)
      expect(err.code).toBe(grpc.status.INVALID_ARGUMENT)
      done()
    })
  })

  it('fails with invalid namespace', (done) => {
    const invalid = 'invalid-namespace-abc'
    namespaceClient.showNamespace(
      {
        name: invalid,
      },
      (err, response) => {
        expect(err).toBeInstanceOf(Error)
        expect(err.code).toBe(grpc.status.NOT_FOUND)
      }
    )
    done()
  })
})

describe('createNamespaceGrpc', () => {
  beforeAll(async () => {
    await fixNamespaceFixtures()
    await createGrpcConnection()
    await initPawsConfig(C.TAILS_PROJECT_DIR_WRITE)
  })
  afterEach(async () => await fixNamespaceFixtures())

  it('succeeds with valid arguments', (done) => {
    namespaceClient.createNamespace(
      {
        name: 'some-namespace-name',
      },
      async (err, response) => {
        expect(err).toBeNull()
        done()
      }
    )
  })

  it('fails with invalid arguments', (done) => {
    namespaceClient.createNamespace({}, (err, response) => {
      expect(err).toBeInstanceOf(Error)
      expect(err.code).toBe(grpc.status.INVALID_ARGUMENT)
      done()
    })
  })
})

describe('deleteNamespaceGrpc', () => {
  beforeAll(async () => {
    await fixNamespaceFixtures()
    await createGrpcConnection()
    await initPawsConfig(C.TAILS_PROJECT_DIR_WRITE)
  })
  afterEach(async () => await fixNamespaceFixtures())

  it('fails with invalid arguments', (done) => {
    namespaceClient.deleteNamespace({}, (err, response) => {
      expect(err).toBeInstanceOf(Error)
      expect(err.code).toBe(grpc.status.INVALID_ARGUMENT)
      done()
    })
  })

  it('fails when namespace already deleted', (done) => {
    namespaceClient.deleteNamespace(
      {
        name: 'already-deleted-namespace',
      },
      (err, response) => {
        expect(err).toBeInstanceOf(Error)
        expect(err.code).toBe(grpc.status.NOT_FOUND)
        done()
      }
    )
  })
})
