import fs from 'fs-extra'
import path from 'path'

const HOME = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE
const XDG_CONFIG_HOME =
  process.env.XDG_CONFIG_HOME || path.join(HOME, '.config')
const TAILS_CONFIG_DIR = path.join(XDG_CONFIG_HOME, 'tails')

const CONFIG_FILE = path.join(TAILS_CONFIG_DIR, 'tails.json')

// helper
async function createStore() {
  await fs.outputJson(CONFIG_FILE, {})
}

async function deleteStore() {
  await fs.remove(CONFIG_FILE)
}

async function readStore() {
  try {
    return await fs.readJson(CONFIG_FILE)
  } catch (err) {
    console.error(err)
  }
}

async function writeStore(obj) {
  try {
    return await fs.writeJson(CONFIG_FILE, obj)
  } catch (err) {
    console.error(err)
  }
}

async function storeExists() {
  try {
    await fs.stat(CONFIG_FILE)
    return true
  } catch (err) {
    return false
  }
}

// core
async function showConfig() {
  if (await storeExists()) {
    const store = await readStore()
    console.log(store)
  } else {
    console.log(
      'error: config non-existent. create one with `tails config create`'
    )
  }
}

async function createConfig() {
  if (await storeExists()) {
    console.log('error: config already exists')
    return
  }
  await createStore()
  console.log('config created')
}

async function deleteConfig() {
  if (await storeExists()) {
    await deleteStore()
    console.log('config deleted')
    return
  }
  console.log('error: config does not exist')
}

async function getKey(key) {
  if (!key) return console.log('error: key cannot be blank')

  let json = await readStore()

  if (!json[key]) return console.log('error: key does not exist')

  console.log(`key '${key}' has value '${json[key]}'`)
}

async function setKey(key, value, isForce) {
  if (!key) return console.log('error: key cannot be blank')

  if (!value) {
    if (isForce) {
      value = undefined
    } else {
      console.log(
        'error: value cannot be blank. pass `-f` to overwrite, deleting the key'
      )
      return
    }
  }

  let json = await readStore()
  if (value === undefined) {
    delete json[key]
    await writeStore(json)
    console.log('key deleted')
  } else {
    json[key] = value
    await writeStore(json)
    console.log(`key '${key}' set with value '${json[key]}'`)
  }
}

export class Config {
  static async show() {
    await showConfig()
  }

  static async create() {
    await createConfig()
  }

  static async delete() {
    await deleteConfig()
  }

  static async get(key) {
    await getKey(key)
  }

  static async set(key, value, isForce) {
    await setKey(key, value, isForce)
  }
}
