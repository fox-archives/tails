import grpc from 'grpc'
import proto from 'google-protobuf'

import { createGrcpConnection, initPawsConfig, client } from './grcpConnection'

beforeAll(async () => {
  await createGrcpConnection()
  await initPawsConfig()
})

describe('showPhysicalProjectGrpc', () => {
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

  // cant really do this cleanly. find way to restart application
  describe('modify env', () => {
    // projectDir is the file system directory containing all projects
    // it('error code on bad projectDir', done => {
      // beforeEach(() => {
      //   const newProjectDir = path.join($, 'test/fixtures/read-test')
      // })
    // })
  })
})
