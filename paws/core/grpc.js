let grpc = require('grpc')
let protoLoader = require('@grpc/proto-loader')

let serverInstance

function GrpcServer() {}
GrpcServer.prototype.create = function(services) {
  if (!serverInstance) {
    let packageDefinition = protoLoader.loadSync('../protobufs/physicalProject.proto', {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    })

    let mainProto = grpc.loadPackageDefinition(packageDefinition).file

    let server = new grpc.Server()
    server.addService(mainProto.PhysicalProjectService.service, {
      listPhysicalProject: services.listPhysicalProjectGrpc
    })
    server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure())
    server.start()

    this.server = server
  } else {
    throw new Error('GrpcClient already instantiated')
  }
}

const s = new GrpcServer()
export { s as GrpcServer }
export { serverInstance as server }
