import './core/common'
import { GrpcServer } from './core/grpc'
import {
  listPhysicalProjectGrpc as listPhysicalProject,
  showPhysicalProjectGrpc as showPhysicalProject
} from './controllers/physicalProjectController'
import {
  getConfigGrpc as getConfig,
  setConfigGrpc as setConfig
} from './controllers/configController'

;(async () => {
  await GrpcServer.create({
    listPhysicalProject,
    showPhysicalProject
  }, {
    getConfig,
    setConfig
  })
})()
