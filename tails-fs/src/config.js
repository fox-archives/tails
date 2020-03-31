import fs from 'fs-extra'
import path from 'path'

import * as ERROR from './errors'

let TAILS_CONFIG_DIR

if (process.env.TAILS_CONFIG_DIR) {
  TAILS_CONFIG_DIR = process.env.TAILS_CONFIG_DIR
} else if (process.env.XDG_CONFIG_HOME) {
  TAILS_CONFIG_DIR = path.join(XDG_CONFIG_HOME, 'tails')
} else {
  const home =
    process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE
  TAILS_CONFIG_DIR = path.join(home, '.config/tails')
}

export const TAILS_CONFIG_FILE = path.join(TAILS_CONFIG_DIR, 'tails.json')

// helper
async function createStore() {
  await fs.outputJson(TAILS_CONFIG_FILE, {})
}

async function deleteStore() {
  await fs.remove(TAILS_CONFIG_FILE)
}

async function readStore() {
  try {
    return await fs.readJson(TAILS_CONFIG_FILE)
  } catch (err) {
    console.error(err)
  }
}

async function writeStore(obj) {
  try {
    return await fs.writeJson(TAILS_CONFIG_FILE, obj)
  } catch (err) {
    console.error(err)
  }
}

async function storeExists() {
  try {
    await fs.stat(TAILS_CONFIG_FILE)
    return true
  } catch (err) {
    return false
  }
}

// core
async function showConfig() {
  if (!(await storeExists())) throw new ERROR.DoesNotExistError('config')

  return readStore()
}

async function createConfig() {
  if (await storeExists()) throw new ERROR.AlreadyExistsError('config')

  return createStore()
}

async function deleteConfig() {
  if (!(await storeExists())) throw new ERROR.DoesNotExistError('config')

  return deleteStore()
}

async function getConfigKey(key) {
  if (!(await storeExists())) throw new ERROR.DoesNotExistError('config')
  if (!key) throw ERROR.InvalidArgumentError('key')

  let json = await readStore()

  if (!json[key]) throw new ERROR.DoesNotExistError('key')

  return json[key]
}

async function setConfigKey(key, value, isForce) {
  if (!(await storeExists())) throw new ERROR.DoesNotExistError('config')
  if (!key) throw new ERROR.InvalidArgumentError('key')
  if (!value && !isForce) throw new ERROR.InvalidArgumentError('force')

  if (isForce) value = undefined

  let json = await readStore()

  if (!json[key]) throw new ERROR.DoesNotExistError('key')

  if (value === undefined) {
    delete json[key]
    await writeStore(json)
  } else {
    json[key] = value
    await writeStore(json)
  }
}

export class Config {
  static show() {
    return showConfig()
  }

  static create() {
    return createConfig()
  }

  static delete() {
    return deleteConfig()
  }

  static get(key) {
    return getConfigKey(key)
  }

  static set(key, value, isForce) {
    return setConfigKey(key, value, isForce)
  }
}
