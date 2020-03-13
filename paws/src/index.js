import './core/common'
import { GrpcServer } from './core/grpc'
import {
  listPhysicalProjectGrpc as listPhysicalProject,
  showPhysicalProjectGrpc as showPhysicalProject
} from './controllers/physicalProjectController'
import { listNamespaceGrpc as listNamespace,
showNamespaceGrpc as showNamespace,
createNamespaceGrpc as createNamespace,
deleteNamespaceGrpc as deleteNamespace } from './controllers/namespaceController'
import {
  getConfigGrpc as getConfig,
  setConfigGrpc as setConfig
} from './controllers/configController'

// TODO: cleanup
;(async () => {
  await GrpcServer.create({
    listPhysicalProject,
    showPhysicalProject
  }, {
    getConfig,
    setConfig
  }, {
    namespaceAPI: {
      listNamespace,
      showNamespace,
      createNamespace,
      deleteNamespace
    }
  })
})()
