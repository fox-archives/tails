import grpc from 'grpc'

import { createGrpcConnection, initPawsConfig, client } from './grpcConnection'

describe('listPhysicalProjectGrpc', () => {
  beforeAll(async () => {
    await createGrpcConnection()
    await initPawsConfig()
  })

  it('succeeds grpc call with correct parameters', (done) => {
    client.listPhysicalProject({}, (err, response) => {
      expect(err).toBeNull()
      done()
    })
  })
})

describe('showPhysicalProjectGrpc', () => {
  beforeAll(async () => {
    await createGrpcConnection()
    await initPawsConfig()
  })

  it('succeeds grpc call with correct parameters', (done) => {
    const projectName = 'project-one'
    client.showPhysicalProject(
      {
        name: projectName,
      },
      (err, response) => {
        // if (err) console.error(err)

        expect(err).toBeNull()
        expect(response).toStrictEqual({
          name: projectName,
          isDirectory: true,
          isFile: false,
          isSymbolicLink: false,
        })
        done()
      }
    )
  })

  it('fails with invalid parameters', (done) => {
    client.showPhysicalProject({}, (err, response) => {
      expect(err).toBeInstanceOf(Error)
      expect(err.code).toBe(grpc.status.INVALID_ARGUMENT)
      done()
    })
  })

  it('fails with invalid projectName', (done) => {
    const projectName = 'does-not-exist-abc'
    client.showPhysicalProject(
      {
        name: projectName,
      },
      (err, response) => {
        expect(err).toBeInstanceOf(Error)
        expect(err.code).toBe(grpc.status.NOT_FOUND)
        done()
      }
    )
  })
})
