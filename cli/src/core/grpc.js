let grpc = require('grpc')
let protoLoader = require('@grpc/proto-loader')

export default (function createProtoClient() {
  let packageDefinition = protoLoader.loadSync('../protobufs/coordinator/project_api.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })

  let mainProto = grpc.loadPackageDefinition(packageDefinition).tails.coordinator.v1

  const client = new mainProto.ProjectAPI(
    'localhost:50052',
    grpc.credentials.createInsecure()
  )
  return client
})()
