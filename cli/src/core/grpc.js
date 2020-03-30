import * as grpc from 'grpc'
import * as protoLoader from '@grpc/proto-loader'

import { $ } from '../util/constants'
const HOST = 'localhost'
const PORT = '50060'

class GrpcChannel {
  #grpcChannel = null

  constructor() {
    this.#grpcChannel = new grpc.Channel(
      `${HOST}:${PORT}`,
      grpc.credentials.createInsecure()
    )
  }

  get channel() {
    return this.#grpcChannel
  }
}

export class Namespace extends GrpcChannel {
  static #instance = null

  static async create() {
    if (this.#instance) return
    
    let namespaceAPIPackageDefinition = await protoLoader.load(
      path.join($, '../protobufs/paws/namespace_api.proto'),
      protoLoaderOptions
    )

    let namespaceAPIPackageObject = grpc.loadPackageDefinition(
      namespaceAPIPackageDefinition
    ).tails.paws.v1

    namespaceClient = new namespaceAPIPackageObject.NamespaceAPI(
      undefined,
      undefined,
      { channelOverride: this.channel }
    )
  }

  get instance() {
    return this.instance
  }
}

export default (function createProtoClient() {
  let packageDefinition = protoLoader.loadSync(
    '../protobufs/coordinator/project_api.proto',
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    }
  )

  let mainProto = grpc.loadPackageDefinition(packageDefinition).tails
    .coordinator.v1

  const client = new mainProto.ProjectAPI(
    'localhost:50052',
    grpc.credentials.createInsecure()
  )
  return client
})()
