import * as ERROR from './errors'
import * as helper from './config.helper'
// should only be used by Config.find()
import { TAILS_CONFIG_FILE } from './config.helper'

/**
 * this is meant to be a low level api (ex. it throws errors, that even if they could be dealt with on their own, aren't)
 * 
 * ```js
 * import { Config } from 'tails-fs'
 * ```
 */

/**
 * shows config in its entirety
 * 
 * @throws DoesNotExistError (err.category = config)
 * @throws Error
 */
async function showConfig() {
  if (!(await helper.storeExists())) throw new ERROR.DoesNotExistError('config')

  try {
    return await helper.readStore()
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * creates blank config
 * 
 * @throws AlreadyExistsError (err.category = config)
 * @throws Error
 */
async function createConfig() {
  if (await helper.storeExists()) throw new ERROR.AlreadyExistsError('config')

  try {
    return await helper.createStore()
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * nuke config off the map
 * 
 * @throws DoesNotExistError (err.config = config)
 * @throws Error
 */
async function deleteConfig() {
  if (!(await helper.storeExists())) throw new ERROR.DoesNotExistError('config')

  try {
    return await helper.deleteStore()
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * gets key from config
 * 
 * @throws DoesNotExistError (err.category = config)
 * @throws InvalidArgumentError (err.category = key)
 * @throws Error
 */
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

/**
 * set key in config
 * 
 * @throws DoesNotExistError (err.category = config | key)
 * @throws InvalidArgumentError (err.category = key | force)
 * @throws Error
 */
async function setConfigKey(key: string, value: string, isForce?: boolean) {
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

/**
 * exported constant variable that gives location of tails config file. here is how it resolves:
 * 
 * 1. if `process.env.TAILS_CONFIG_DIR` is set, relative to that, it resolves to `./tails.json`
 * 2. if `process.env.XDG_CONFIG_HOME` is set, relative to that, it resolves to `./tails/tails.json`
 * 3. if `process.env.XDG_CONFIG_HOME` is not set, relative to `process.env.HOME|HOMEPATH|USERPROFILE`, it resolves to `./.config/tails/tails.json`
 */
export { TAILS_CONFIG_FILE }


export class Config {
  // TODO: fix add types
  static show() {
    return showConfig()
  }

  static create() {
    return createConfig()
  }

  static delete() {
    return deleteConfig()
  }

  // TODO: fix
  static get(key: string) {
    return getConfigKey(key)
  }

  // TODO: fix?
  static set(key: string, value: string, isForce?: boolean) {
    return setConfigKey(key, value, isForce)
  }

  // TODO: fix
  static find(): Promise<string> {
    return findConfig()
  }
}
