import path from 'path'

let grpc = require('grpc')

import { $ } from '../config'
import {
  listPhysicalProject,
  showPhysicalProject
} from '../services/physicalProjectService'

const projectDir = path.join($, '../projects')

export function listPhysicalProjectGrpc(call, cb) {
  // wrap(async () => {
  //   await listPhysicalProject(projectDir, {
  //     simple: true
  //   })
  // }, cb)
}

export function showPhysicalProjectGrpc(call, cb) {
  ;(async () => {
    if (!call.request.name) {
      return cb({
        code: grpc.status.INVALID_ARGUMENT,
        details: "must have a property called 'name'"
      })
    }

    try {
      const projectName = call.request.name
      const value = await showPhysicalProject(projectDir, projectName, {
        simple: call.request.simple || false
      })
      cb(null, { name: value })
    } catch (err) {
      cb({
        code: grpc.status.INTERNAL,
        details: 'error reading file system'
      })
    }
  })()
}
