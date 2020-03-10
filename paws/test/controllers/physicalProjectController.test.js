import path from 'path'

let grpc = require('grpc')
let protoLoader = require('@grpc/proto-loader')

const projectProtobuf = path.join(
  __dirname,
  '../../../protobufs/paws/physical_project_api.proto'
)

describe('physicalProjectController', () => {
  test('physicalProjectController accessible via grpc', async () => {
    let packageDefinition = protoLoader.loadSync(projectProtobuf, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    })

    let mainProto = grpc.loadPackageDefinition(packageDefinition).tails.paws.v1

    const client = new mainProto.PhysicalProjectAPI(
      'localhost:50053',
      grpc.credentials.createInsecure()
    )

    const projectName = 'css-test'
    return new Promise((resolve, reject) => {
      client.showPhysicalProject(
        {
          name: projectName,
          simple: true
        },
        (err, response) => {
          if (err) return console.error(err), reject()

          expect(response.name).toBe(projectName)
          resolve()
        }
      )
    }).catch(err => {
      console.error(err)
    })
  })
})
