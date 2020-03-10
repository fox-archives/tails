import path from 'path'

import {
  listPhysicalProject,
  showPhysicalProject
} from '../services/physicalProjectService'

const projectDir = path.join(__dirname, '../../projects')

const wrap = (asyncFn, cb) => {
  new Promise(async (resolve, reject) => {
    try {
      const value = await asyncFn()
      console.log(value)
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

export function showPhysicalProjectGrpc(call, cb) {
  new Promise(async (resolve, reject) => {
    try {
      const projectName = call.request.name
      const value = await showPhysicalProject(projectDir, projectName, {
        simple: true
      })
      resolve(value)
    } catch (err) {
      console.error(err)
      reject(err)
    }
  })
  .then(result => {
    cb(null, { name: result })
  })
  .catch(err => {
    console.error(err)
  })
}
