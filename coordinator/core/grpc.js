let grpc = require('grpc')
let protoLoader = require('@grpc/proto-loader')

let instance
let clientInstance

class GrpcServer {
  get instance() {
    return instance
  }

  set server(server) {
    instance = server
  }

  create(services) {
    if (!this.instance) {
      let packageDefinition = protoLoader.loadSync(
        '../protobufs/coordinator/project_api.proto',
        {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true
        }
      )

      let mainProto = grpc.loadPackageDefinition(packageDefinition).tails.coordinator.v1

      let server = new grpc.Server()
      server.addService(mainProto.ProjectAPI.service, {
        showProject: services.showProject
      })
      server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure())
      server.start()

      this.server = server
    } else {
      throw new Error('GrpcServer already instantiated')
    }
  }
}

function GrpcClient() {}
GrpcClient.prototype.create = function() {
  if (!clientInstance) {
    let packageDefinition = protoLoader.loadSync('../protobufs/coordinator/project_api.proto', {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    })

    let mainProto = grpc.loadPackageDefinition(packageDefinition).tails.coordinator

    const client = new mainProto.Project(
      'localhost:50052',
      grpc.credentials.createInsecure()
    )
  }
}

const s = new GrpcServer()
const c = new GrpcClient()

export { s as GrpcServer }
export { c as GrpcClient }

export { instance as server }
export { clientInstance as client }
