import { Config } from 'tails-fs'

import { TAILS_ROOT_DIR_KEY_NAME } from '../util/constants'

export async function isTailsRootDirSet() {
  try {
    await Config.get(TAILS_ROOT_DIR_KEY_NAME)
    return true
  } catch (err) {
    return false
  }
}
