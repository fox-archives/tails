let grpc = require('grpc')
let protoLoader = require('@grpc/proto-loader')

export default (function createProtoClient() {
  let packageDefinition = protoLoader.loadSync('../protobufs/project.proto', {
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
  return client
})()
