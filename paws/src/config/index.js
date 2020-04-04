import path from 'path'

export const protoLoaderOptions = Object.freeze({
  keepCase: false,
  enums: String,
  defaults: false,
})

export const RUNTIME_CONFIG_STATUS = Object.freeze({
  INVALID: 'INVALID',
  UPDATED: 'UPDATED',
  STALE: 'STALE',
})

// default status value for runtimeConfig is 'INVALID'
// this means that application should not do anything until value set
export const RUNTIME_CONFIG = {
  STATUS: RUNTIME_CONFIG_STATUS.INVALID,
  // !! this is referenced in a string in controllers/configController
  TAILS_PROJECT_DIR: '',
}

export const $ = path.join(__dirname, '../../')
