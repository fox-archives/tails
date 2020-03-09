import path from 'path'
import fs from 'fs'

import { listPhysicalProjectGrpc } from './controllers/physicalProjectController'

import { GrpcServer } from './core/grpc'

GrpcServer.create({
  listPhysicalProjectGrpc
})
