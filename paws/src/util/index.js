import fs from 'fs'
import path from 'path'

import toml from 'toml'
import grpc from 'grpc'

import { RUNTIME_CONFIG_STATUS, RUNTIME_CONFIG } from '../config'
import { PhysicalProjectStorageReadError } from './errors'

const dotFile = '.tails.toml'

export async function readProjectDirRaw(projectDir) {
  try {
    return await fs.promises.readdir(projectDir, {
      encoding: 'utf8',
      withFileTypes: true
    })
  } catch (err) {
    throw new PhysicalProjectStorageReadError(
      `failed to read directory ${projectDir}`
    )
  }
}

// cb is the cb argument received from grpc functions
export async function requireRuntimeConfigInit(cb) {
  if (RUNTIME_CONFIG.STATUS === RUNTIME_CONFIG_STATUS.INVALID) {
    cb({
      code: grpc.status.FAILED_PRECONDITION,
      details: 'runtime configuration not setup. ensure you first initiate grpc call to set config before making any other calls'
    })
    return true
  }
  
  if (RUNTIME_CONFIG.status === RUNTIME_CONFIG_STATUS.STALE) {
    // right now, nothing sets the status as 'stale'. if we have something that does,
    // we can make grpc call to `coordinator` to grab config. we can also do this
    // automatically when the status is in an 'INVALID' state. this is why the
    // function is async (even if there are no implementations that depend on it)
  }

  if (RUNTIME_CONFIG.status === RUNTIME_CONFIG_STATUS.UPDATED) {
    // config is updated, we don't need to do anything
  }
}
