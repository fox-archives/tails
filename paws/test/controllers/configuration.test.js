import grpc from 'grpc'

import { createGrcpConnection, client } from './grcpConnection'

// separate file because i want a separate execution context since
// importing and executing modules from `grpConnection` may not
// be idempotent (just in case)
describe('configurationGeneral', () => {
  beforeAll(async () => {
    await createGrcpConnection()
  })

  it('fails to execute grpc call when config has not been setup', done => {
    const projectName = 'project-one'
    client.showPhysicalProject(
      {
        name: projectName
      },
      (err, response) => {
        expect(err).toBeInstanceOf(Error)
        expect(err.code).toBe(grpc.status.FAILED_PRECONDITION)
        done()
      }
    )
  })
})
