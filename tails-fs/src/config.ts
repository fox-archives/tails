import * as ERROR from './errors'
import * as helper from './config.helper'
// should only be used by Config.find()
import { TAILS_CONFIG_FILE } from './config.helper'

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
    return await helper.deleteStore()
  } catch (err) {
    throw new Error(err)
  }
}

async function getConfigKey(key: string) {
  if (!(await helper.storeExists())) throw new ERROR.DoesNotExistError('config')
  if (!key) throw new ERROR.InvalidArgumentError('key', key)

  let json
  try {
    json = await helper.readStore()
  } catch (err) {
    throw new Error(err)
  }

  if (!json[key]) throw new ERROR.DoesNotExistError('key', key)

  return json[key]
}

async function setConfigKey(key: string, value: string, isForce: boolean) {
  if (!(await helper.storeExists())) throw new ERROR.DoesNotExistError('config')
  if (!value && !isForce) throw new ERROR.InvalidArgumentError('force', isForce)

  try {
    let json = await helper.readStore()

    if (isForce) {
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

async function findConfig() {
  if (!(await helper.storeExists())) throw new ERROR.DoesNotExistError('config')

  return TAILS_CONFIG_FILE
}

export { TAILS_CONFIG_FILE }
export class Config {
  // TODO: fix
  static show(): Promise<void> {
    return showConfig()
  }

  static create(): Promise<void> {
    return createConfig()
  }

  static delete(): Promise<void> {
    return deleteConfig()
  }

  // TODO: fix
  static get(key: string): Promise<void> {
    return getConfigKey(key)
  }

  // TODO: fix?
  static set(key: string, value: string, isForce: boolean): Promise<void> {
    return setConfigKey(key, value, isForce)
  }

  // TODO: fix
  static find(): Promise<string> {
    return findConfig()
  }
}
