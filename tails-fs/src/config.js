import * as ERROR from './errors'
import * as helper from './config.helper'

async function showConfig() {
  if (!(await helper.storeExists())) throw new ERROR.DoesNotExistError('config')

  try {
    return await helper.readStore()
  } catch (err) {
    throw new Error(err)
  }
}

async function createConfig() {
  if (await helper.storeExists()) throw new ERROR.AlreadyExistsError('config')

  try {
    return await helper.createStore()
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteConfig() {
  if (!(await helper.storeExists())) throw new ERROR.DoesNotExistError('config')

  try {
    return await helper.deleteConfig()
  } catch (err) {
    throw new Error(err)
  }
}

async function getConfigKey(key) {
  if (!(await helper.storeExists())) throw new ERROR.DoesNotExistError('config')
  if (!key) throw new ERROR.InvalidArgumentError('key')

  try {
    let json = await helper.readStore()

    if (!json[key]) throw new ERROR.DoesNotExistError('key')

    return json[key]
  } catch (err) {
    throw new Error(err)
  }
}

async function setConfigKey(key, value, isForce) {
  if (!(await helper.storeExists()))
    throw new ERROR.DoesNotExiInvalidArgumentErrorumentError('force')

  if (isForce) value = undefined

  try {
    let json = await helper.readStore()

    if (value === undefined) {
      delete json[key]
      await helper.writeStore(json)
    } else {
      json[key] = value
      await helper.writeStore(json)
    }
  } catch (err) {
    throw new Error(err)
  }
}

export { TAILS_CONFIG_FILE } from './config.helper'
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
