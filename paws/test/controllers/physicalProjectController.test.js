import path from 'path'

describe('physicalProjectController', () => {
  test('physicalProjectController accessible via grpc', async () => {
    let packageDefinition = protoLoader.loadSync('../../protobufs/project.proto', {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    })

    let mainProto = grpc.loadPackageDefinition(packageDefinition).main

    const client = new mainProto.Project(
      'localhost:50052',
      grpc.credentials.createInsecure()
    )

    const projectName = 'css-test'
    client.showPhysicalProject({
      name: projectName
    }, (err, response) => {
      if (err) return console.error(err), reject()

      console.log(response)
    })
  })
})
