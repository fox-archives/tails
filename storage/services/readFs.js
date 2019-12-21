import path from 'path'
import fs from 'fs'

import { PROJECTS } from '../util/constants'

export async function readProjects() {
  return (
    await fs.promises.readdir(PROJECTS, {
      withFileTypes: true
    })
  )
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
}
