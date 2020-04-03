import fs from 'fs-extra'

import { getNamespaceFolder } from './util'

export function createPhysicalNamespaceRaw(tailsRootDir, namespace) {
  const namespaceFolder = getNamespaceFolder(tailsRootDir, namespace)
  return fs.promises.mkdir(namespaceFolder, {
    mode: 0o755,
  })
}


export async function deletePhysicalNamespaceRaw(tailsRootDir, namespace) {
  // we include the stat because fs.remove from fs-extra does not
  // error if the folder does not exist. fs.promises.stat does
  const namespaceFolder = getNamespaceFolder(tailsRootDir, namespace)
  await fs.promises.stat(namespaceFolder)
  await fs.remove(namespaceFolder)
}
