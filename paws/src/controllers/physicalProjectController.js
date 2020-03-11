let grpc = require('grpc')

import { RUNTIME_CONFIG } from '../config'
import {
  PhysicalProjectStorageReadError,
  PhysicalProjectNotFoundError
} from '../util/errors'
import { requireRuntimeConfigInit } from '../util'
import {
  listPhysicalProject,
  showPhysicalProject
} from '../services/physicalProjectService'

export function listPhysicalProjectGrpc(call, cb) {
  ;(async () => {
    await requireRuntimeConfigInit(cb)
  })()
}

export function showPhysicalProjectGrpc(call, cb) {
  ;(async () => {
    if (await requireRuntimeConfigInit(cb)) return

    console.log('bar')
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
        cb({
          code: grpc.status.NOT_FOUND,
          details: 'project with the specified name not found'
        })
      }

      if (err instanceof PhysicalProjectStorageReadError) {
        cb({
          code: grpc.status.INTERNAL,
          details:
            'could not read the storage that contains all of your files (eg. the file system)'
        })
      }
    }
  })()
}
