import fs from 'fs-extra'
import path from 'path'

export function getNamespaceFolder(tailsRootDir, namespace) {
  return path.join(tailsRootDir, `_${namespace}`)
}

export async function doesNamespaceExist(tailsRootDir, namespace) {
  const namespaceFolder = path.join(tailsRootDir, `_${namespace}`)
  try {
    await fs.promises.stat(namespaceFolder)
  } catch {
    return false
  }
  return true
}

export function readDirRaw(tailsRootDir) {
  return fs.promises.readdir(tailsRootDir, {
    encoding: 'utf8',
    withFileTypes: true,
  })
}
