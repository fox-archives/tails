import grpc from 'grpc'

import { createGrpcConnection, client } from './grpcConnection'

// flaky test, don't share connection
// separate file because i want a separate execution context since
// importing and executing modules from `grpConnection` may not
// be idempotent (just in case)
describe.skip('configurationGeneral', () => {
  beforeAll(async () => {
    await createGrpcConnection()
  })

  it('fails to execute grpc call when config has not been setup', (done) => {
    const projectName = 'project-one'
    client.showPhysicalProject(
      {
        name: projectName,
      },
      (err, response) => {
        if (response) console.log(response)

        expect(err).toBeInstanceOf(Error)
        expect(err.code).toBe(grpc.status.FAILED_PRECONDITION)
        done()
      }
    )
  })
})
