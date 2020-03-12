import grpc from 'grpc'

import { RUNTIME_CONFIG } from '../config'

export function getConfigGrpc(call, cb) {
  if (!call.request.key) {
    return cb({
      code: grpc.status.INVALID_ARGUMENT,
      details: "must have a property called 'key'"
    })
  }

  if (!RUNTIME_CONFIG.hasOwnProperty(call.request.key)) {
    return cb({
      code: grpc.status.INVALID_ARGUMENT,
      details: 'configuration key does not exist on configuration object'
    })
  }

  return cb(null, {
    value: RUNTIME_CONFIG[call.request.key]
  })
}

export function setConfigGrpc(call, cb) {
  if (!call.request.key || !call.request.value) {
    return cb({
      code: grpc.status.INVALID_ARGUMENT,
      details: "must have a property called 'key' and 'value'"
    })
  }

  if (!RUNTIME_CONFIG.hasOwnProperty(call.request.key)) {
    return cb({
      code: grpc.status.INVALID_ARGUMENT,
      details: 'configuration key does not exist on configuration object'
    })
  }

  RUNTIME_CONFIG[call.request.key] = call.request.value

  // set the config status to 'UPDATED' if the
  // TAILS_PROJECT_DIR has been set and the previous
  // value was 'INVALID'
  if (RUNTIME_CONFIG.STATUS = RUNTIME_CONFIG.INVALID && call.request.value === "TAILS_PROJECT_DIR")


  if (RUNTIME_CONFIG[call.request.key] !== call.request.value) {
    return cb({
      code: grpc.status.INTERNAL,
      details: 'failed to set value of key on configuration object'
    })
  }

  cb(null, {
    status: 'SUCCESS'
  })
}
