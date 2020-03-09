import path from 'path'

import { server } from '../core/grpc'
import { listPhysicalProject } from '../services/physicalProjectService'

const projectDir = path.join(__dirname, '../../projects')

const wrap = (asyncFn, cb) => {
  new Promise(async (resolve, reject) => {
    try {
      const value = await asyncFn()
      resolve(cb(null, value))
    } catch (err) {
      reject(cb(err))
    }
  })
}

export function listPhysicalProjectGrpc(call, cb) {
  wrap(async () => {
    await listPhysicalProject(projectDir, {
      simple: true
    })
  }, cb)
}
