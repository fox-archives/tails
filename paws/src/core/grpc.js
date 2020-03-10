import path from 'path'

let grpc = require('grpc')
let protoLoader = require('@grpc/proto-loader')

import { protoLoaderOptions, $ } from '../config'

let serverInstance

function GrpcServer() {}
GrpcServer.prototype.create = function(services) {
  if (!serverInstance) {
    // TODO: do not access out of dir
    let packageDefinition = protoLoader.loadSync(
      path.join($, '../protobufs/paws/physical_project_api.proto'),
      protoLoaderOptions
    )

    let mainProto = grpc.loadPackageDefinition(packageDefinition).tails.paws.v1

    let server = new grpc.Server()
    server.addService(mainProto.PhysicalProjectAPI.service, { ...services })
    server.bind('0.0.0.0:50053', grpc.ServerCredentials.createInsecure())
    server.start()

    this.server = server
  } else {
    throw new Error('GrpcClient already instantiated')
  }
}

const s = new GrpcServer()
export { s as GrpcServer }
export { serverInstance as server }
