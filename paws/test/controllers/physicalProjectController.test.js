import { createGrcpConnection, client } from './grcpConnection'

beforeAll(async () => {
  await createGrcpConnection()
})

describe('physicalProjectController', () => {
  test('showPhysicalProjectGrpc works on success', done => {
    const projectName = 'css-test'
    client.showPhysicalProject(
      {
        name: projectName,
        simple: true
      },
      (err, response) => {
        if (err) return console.error(err)

        expect(response.name).toBe(projectName)
        done()
      }
    )
  })
})

describe('physicalProjectController', () => {
  test('showPhysicalProjectGrpc fails on error', done => {
    const projectName = 'does-not-exist-abc'
    client.showPhysicalProject(
      {
        name: projectName,
        simple: true
      },
      (err, response) => {
        expect(err).toBeInstanceOf(Error)
        done()
      }
    )
  })
})
