let grpc = require('grpc')

import { RUNTIME_CONFIG } from '../config'
import {
  StorageReadError,
  PhysicalProjectNotFoundError
} from '../util/errors'
import { requireRuntimeConfigInit } from '../util'
import {
  listPhysicalProject,
  showPhysicalProject
} from '../services/physicalProjectService'

export function listPhysicalProjectGrpc(call, cb) {
  ;(async () => {
    if (await requireRuntimeConfigInit(cb)) return

    try {
      const obj = await listPhysicalProject(RUNTIME_CONFIG.TAILS_PROJECT_DIR)
      cb(null, obj)
    } catch (err) {
      if (err instanceof StorageReadError) {
        return cb({
          code: grpc.status.INTERNAL,
          details:
            'could not read the storage that contains all of your files (eg. the file system)'
        })
      }
     
      return cb({
        code: grpc.status.INTERNAL,
        details: `${__dirname}: unknown error. please check logs`
      })
    }
  })()
}

export function showPhysicalProjectGrpc(call, cb) {
  ;(async () => {
    if (await requireRuntimeConfigInit(cb)) return

    if (!call.request.name) {
      return cb({
        code: grpc.status.INVALID_ARGUMENT,
        details: "must have a property called 'name'"
      })
    }

    try {
      const obj = await showPhysicalProject(RUNTIME_CONFIG.TAILS_PROJECT_DIR, {
        name: call.request.name
      })
      cb(null, obj)
    } catch (err) {
      if (err instanceof PhysicalProjectNotFoundError) {
        return cb({
          code: grpc.status.NOT_FOUND,
          details: 'project with the specified name not found'
        })
      }

      if (err instanceof StorageReadError) {
        return cb({
          code: grpc.status.INTERNAL,
          details:
            'could not read the storage that contains all of your files (eg. the file system)'
        })
      }

      return cb({
        code: grpc.status.INTERNAL,
        details: `${__dirname}: unknown error. please check logs`
      })
    }
  })()
}
