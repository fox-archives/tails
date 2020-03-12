import grpc from 'grpc'

import { createGrcpConnection, initPawsConfig, client } from './grcpConnection'

describe('showPhysicalProjectGrpc', () => {
  beforeAll(async () => {
    await createGrcpConnection()
    await initPawsConfig()
  })

  it('works with correct parameters', done => {
    const projectName = 'project-one'
    client.showPhysicalProject(
      {
        name: projectName
      },
      (err, response) => {
        // if (err) console.error(err)

        expect(err).toBeNull()
        expect(response).toStrictEqual({
          name: projectName,
          isDirectory: true,
          isFile: false,
          isSymbolicLink: false
        })
        done()
      }
    )
  })

  it('error code on no name', done => {
    client.showPhysicalProject({}, (err, response) => {
      expect(err).toBeInstanceOf(Error)
      expect(err.code).toBe(grpc.status.INVALID_ARGUMENT)
      done()
    })
  })

  it('error code on non existing projectName', done => {
    const projectName = 'does-not-exist-abc'
    client.showPhysicalProject(
      {
        name: projectName
      },
      (err, response) => {
        expect(err).toBeInstanceOf(Error)
        expect(err.code).toBe(grpc.status.NOT_FOUND)
        done()
      }
    )
  })
})
