import * as grpc from 'grpc'

import {
  listNamespace,
  showNamespace,
  createNamespace,
  deleteNamespace
} from '../services/namespaceService'
import { requireRuntimeConfigInit } from '../util'
import { RUNTIME_CONFIG } from '../config'
import { NamespaceNotFoundError } from '../util/errors'

export function listNamespaceGrpc(call, cb) {
  ;(async () => {
    if (await requireRuntimeConfigInit(cb)) return

    try {
      const obj = await listNamespace(RUNTIME_CONFIG.TAILS_PROJECT_DIR)
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

export function showNamespaceGrpc(call, cb) {
  ;(async () => {
    if (await requireRuntimeConfigInit(cb)) return

    if (!call.request.name) {
      return cb({
        code: grpc.status.INVALID_ARGUMENT,
        details: "must have a property called 'name'"
      })
    }

    try {
      const obj = await showNamespace(RUNTIME_CONFIG.TAILS_PROJECT_DIR, {
        name: call.request.name
      })
      cb(null, obj)
    } catch (err) {
      if (err instanceof NamespaceNotFoundError) {
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

export function createNamespaceGrpc(call, cb) {
  ;(async () => {
    if (await requireRuntimeConfigInit(cb)) return

    if (!call.request.name) {
      return cb({
        code: grpc.status.INVALID_ARGUMENT,
        details: "must have a property called 'name'"
      })
    }

    try {
      const obj = await createNamespace(RUNTIME_CONFIG.TAILS_PROJECT_DIR, {
        name: call.request.name
      })
      cb(null, obj)
    } catch (err) {
      if (err instanceof NamespaceNotFoundError) {
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

export function deleteNamespaceGrpc(call, cb) {
  ;(async () => {
    if (await requireRuntimeConfigInit(cb)) return

    if (!call.request.name) {
      return cb({
        code: grpc.status.INVALID_ARGUMENT,
        details: "must have a property called 'name'"
      })
    }

    try {
      const obj = deleteNamespace(RUNTIME_CONFIG.TAILS_PROJECT_DIR, {
        name: call.request.name
      })
      cb(null, obj)
    } catch (err) {
      if (err instanceof NamespaceNotFoundError) {
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
