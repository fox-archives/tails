import path from 'path'
// import proto from 'google-protobuf'
let proto = require('google-protobuf')
let protobufjs = require('protobufjs')

let grpc = require('grpc')
// import * as grpc from 'grpc'
let protoLoader = require('@grpc/proto-loader')

import { protoLoaderOptions, $ } from '../../src/config'

let client
let client2

async function createGrcpConnection() {
  const HOST = '0.0.0.0'
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

  let channel = new grpc.Channel(
    `${HOST}:${PORT}`,
    grpc.credentials.createInsecure()
  )

  let grpcClient1 = new physicalProjectAPIPackageObject.PhysicalProjectAPI(
    undefined,
    undefined, {
      channelOverride: channel
    }
  )
  let grpcClient2 = new configAPIPackageObject.ConfigAPI(
    undefined,
    undefined, {
      channelOverride: channel
    }
  )

  client = grpcClient1
  client2 = grpcClient2
}

export { createGrcpConnection }
export { client, client2 }

export async function initPawsConfig() {
  await new Promise((resolve, reject) => {
    client2.setConfig(
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
