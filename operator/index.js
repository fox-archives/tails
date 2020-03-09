let grpc = require('grpc')
let protoLoader = require('@grpc/proto-loader')

let packageDefinition = protoLoader.loadSync('../protobufs/project.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
})

let mainProto = grpc.loadPackageDefinition(packageDefinition).main


function showProject(call, cb) {
  cb(null, {
    name: call.request.name,
    prop: 'other property'
  })
}
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  let server = new grpc.Server()
  server.addService(mainProto.Project.service, {
    showProject
  })
  server.bind('0.0.0.0:50052', grpc.ServerCredentials.createInsecure())
  server.start()
}

main()
