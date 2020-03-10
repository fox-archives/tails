import path from 'path'

let grpc = require('grpc')
let protoLoader = require('@grpc/proto-loader')

import { protoLoaderOptions, $ } from '../../src/config'
const projectProtobuf = path.join(
  $,
  '../protobufs/paws/physical_project_api.proto'
)

let client;
async function createGrcpConnection() {
  const HOST = 'localhost'
  const PORT = '50053'

  let packageDefinition = protoLoader.loadSync(
    projectProtobuf,
    protoLoaderOptions
  )
  let proto = grpc.loadPackageDefinition(packageDefinition).tails.paws.v1
  let c = new proto.PhysicalProjectAPI(
    `${HOST}:${PORT}`,
    grpc.credentials.createInsecure()
  )
  client = c
}

export { createGrcpConnection }
export { client }
