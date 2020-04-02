import path from 'path'

export const TAILS_CONFIG_FILE = resolveTailsConfigFile()

let store = null

function resolveTailsConfigFile() {
  return path.join(__dirname, '../__tests__/tails.json')
}

export async function createStore() {
  store = {}
}

export async function deleteStore() {
  store = null
}

export async function readStore() {
  return store
}

export async function writeStore(obj) {
  store = obj
}

export async function storeExists() {
  return store !== null
}
