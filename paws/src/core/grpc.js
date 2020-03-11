import path from 'path'

let grpc = require('grpc')
let protoLoader = require('@grpc/proto-loader')

import { protoLoaderOptions, $ } from '../config'

let serverInstance

function GrpcServer() {}
GrpcServer.prototype.create = async function(
  physicalProjectServices,
  configAPIServices
) {
  if (!serverInstance) {
    // TODO: do not access out of dir
    let physicalProjectAPIPackageDefinition = await protoLoader.load(
      path.join($, '../protobufs/paws/physical_project_api.proto'),
      protoLoaderOptions
    )

    let configAPIPackageDefinition = await protoLoader.load(
      path.join($, '../protobufs/paws/config_api.proto'),
      protoLoaderOptions
    )

    let physicalProjectAPIPackageObject = grpc.loadPackageDefinition(
      physicalProjectAPIPackageDefinition
    ).tails.paws.v1
    let configAPIPackageObject = grpc.loadPackageDefinition(
      configAPIPackageDefinition
    ).tails.paws.v1

    let server = new grpc.Server()
    server.addService(
      physicalProjectAPIPackageObject.PhysicalProjectAPI.service,
      {
        ...physicalProjectServices
      }
    )
    server.addService(configAPIPackageObject.ConfigAPI.service, {
      ...configAPIServices
    })
    server.bind('0.0.0.0:50053', grpc.ServerCredentials.createInsecure())
    server.start()

    serverInstance = server
  } else {
    throw new Error('GrpcClient already instantiated')
  }
}

const s = new GrpcServer()
export { s as GrpcServer }
export { serverInstance as server }
