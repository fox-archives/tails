import path from 'path'

import * as grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'

import { protoLoaderOptions, $ } from '../../src/config'

let client
let namespaceClient
let client2

async function createGrpcConnection() {
  const HOST = 'localhost'
  const PORT = '50053'

  let physicalProjectAPIPackageDefinition = await protoLoader.load(
    path.join($, '../protobufs/paws/physical_project_api.proto'),
    protoLoaderOptions
  )
  let namespaceAPIPackageDefinition = await protoLoader.load(
    path.join($, '../protobufs/paws/namespace_api.proto'),
    protoLoaderOptions
  )
  let configAPIPackageDefinition = await protoLoader.load(
    path.join($, '../protobufs/paws/config_api.proto'),
    protoLoaderOptions
  )

  let physicalProjectAPIPackageObject = grpc.loadPackageDefinition(
    physicalProjectAPIPackageDefinition
  ).tails.paws.v1
  let namespaceApiPackageObject = grpc.loadPackageDefinition(
    namespaceAPIPackageDefinition
  ).tails.paws.v1
  let configAPIPackageObject = grpc.loadPackageDefinition(
    configAPIPackageDefinition
  ).tails.paws.v1

  let channel = new grpc.Channel(
    `${HOST}:${PORT}`,
    grpc.credentials.createInsecure()
  )

  client = new physicalProjectAPIPackageObject.PhysicalProjectAPI(
    undefined,
    undefined,
    {
      channelOverride: channel
    }
  )
  namespaceClient = new namespaceApiPackageObject.NamespaceAPI(
    undefined,
    undefined,
    { channelOverride: channel }
  )
  client2 = new configAPIPackageObject.ConfigAPI(undefined, undefined, {
    channelOverride: channel
  })
}

export { createGrpcConnection }
export { client, namespaceClient, client2 }

export async function initPawsConfig(tailsProjectDir) {
  await new Promise((resolve, reject) => {
    client2.setConfig(
      {
        key: 'TAILS_PROJECT_DIR',
        value: tailsProjectDir || path.join($, 'test/fixtures/read-test')
      },
      (err, response) => {
        if (err) console.error(err), reject(err)
        resolve(response)
      }
    )
  })
}
