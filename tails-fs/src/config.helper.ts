import path from 'path'
import fs from 'fs-extra'

export const TAILS_CONFIG_FILE = resolveTailsConfigFile()

function resolveTailsConfigFile() {
  let TAILS_CONFIG_DIR

  // TODO: ugly
  if (process.env.TAILS_CONFIG_DIR) {
    TAILS_CONFIG_DIR = process.env.TAILS_CONFIG_DIR
  } else if (process.env.XDG_CONFIG_HOME) {
    TAILS_CONFIG_DIR = path.join(process.env.XDG_CONFIG_HOME, 'tails')
  } else {
    type home = string | undefined
    const home =
      process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE
    if (home) {
      TAILS_CONFIG_DIR = path.join(home, '.config/tails')
    } else {
      throw new Error(
        'cannot find home directory. environment variables HOME, HOMEPATH, USERPROFILE are not defined'
      )
    }
  }

  return path.join(TAILS_CONFIG_DIR, 'tails.json')
}

export function createStore() {
  return fs.outputJson(TAILS_CONFIG_FILE, {})
}

export function deleteStore() {
  return fs.remove(TAILS_CONFIG_FILE)
}

export function readStore() {
  return fs.readJson(TAILS_CONFIG_FILE)
}

export async function writeStore(obj: object) {
  return fs.writeJson(TAILS_CONFIG_FILE, obj)
}

export async function storeExists() {
  try {
    await fs.stat(TAILS_CONFIG_FILE)
    return true
  } catch (err) {
    return false
  }
}
