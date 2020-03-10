import { GrpcServer } from './core/grpc'
import {
  listPhysicalProjectGrpc as listPhysicalProject,
  showPhysicalProjectGrpc as showPhysicalProject
} from './controllers/physicalProjectController'

GrpcServer.create({
  listPhysicalProject,
  showPhysicalProject
})
