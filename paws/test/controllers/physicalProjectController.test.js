import { createGrcpConnection, client } from './grcpConnection'

beforeAll(async () => {
  await createGrcpConnection()
})

describe('showPhysicalProjectGrpc', () => {
  test('works with correct parameters', done => {
    const projectName = 'css-test'
    client.showPhysicalProject(
      {
        name: projectName
      },
      (err, response) => {
        if (err) return console.error(err)

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

  test('correct error code on no name', done => {
    client.showPhysicalProject({}, (err, response) => {
      expect(err).toBeInstanceOf(Error)
      done()
    })
  })

  test('fails on error', done => {
    const projectName = 'does-not-exist-abc'
    client.showPhysicalProject(
      {
        name: projectName
      },
      (err, response) => {
        expect(err).toBeInstanceOf(Error)
        done()
      }
    )
  })
})
