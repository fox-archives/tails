import fs from 'fs-extra'

import * as TC from './testConstants'
import { Config } from '../config'

export async function setConfig(config: {[key: string]: string}) {
  await Config.create()
  for (let property in config) {
    await Config.set(property, config[property])
  }
}

export async function fixNamespaceFixtures() {
  const src = TC.TEST_TAILS_ROOT_DIR_WRITE_BACKUP
  const dest = TC.TEST_TAILS_ROOT_DIR_WRITE
  await fs.emptyDir(dest)
  await fs.copy(src, dest)
}
