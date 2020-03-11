import path from 'path'

let grpc = require('grpc')
// import * as grpc from 'grpc'
let protoLoader = require('@grpc/proto-loader')

import { protoLoaderOptions, $ } from '../../src/config'

let client
async function createGrcpConnection() {
  const HOST = 'localhost'
  const PORT = '50053'

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


  let grpcClient1 = new physicalProjectAPIPackageObject.PhysicalProjectAPI(
    `${HOST}:${PORT}`,
    grpc.credentials.createInsecure()
  )
  let grpcClient2 = configAPIPackageObject.ConfigAPI(
    `${HOST}:${PORT}`,
    grpc.credentials.createInsecure()
  )
  grcp.
  client = grpcClient1
}

export { createGrcpConnection }
export { client }

export async function initPawsConfig() {
  await new Promise((resolve, reject) => {
    client.setConfig(
      {
        key: 'TAILS_PROJECT_DIR',
        value: path.join($, 'test/fixtures/read-test')
      },
      (err, response) => {
        if (err) console.error(err), reject(err)

        resolve(response)
      }
    )
  })
}
