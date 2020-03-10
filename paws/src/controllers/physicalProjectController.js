import path from 'path'

let grpc = require('grpc')

import { $ } from '../config'
import {
  listPhysicalProject,
  showPhysicalProject
} from '../services/physicalProjectService'

const PROJECT_DIR = path.join($, '../projects')

export function listPhysicalProjectGrpc(call, cb) {}

export function showPhysicalProjectGrpc(call, cb) {
  ;(async () => {
    if (!call.request.name) {
      return cb({
        code: grpc.status.INVALID_ARGUMENT,
        details: "must have a property called 'name'"
      })
    }

    try {
      const obj = await showPhysicalProject(PROJECT_DIR, {
        name: call.request.name
      })
      cb(null, obj)
    } catch (err) {
      cb({
        code: grpc.status.INTERNAL,
        details: 'error reading file system'
      })
    }
  })()
}
