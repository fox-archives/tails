import fs from 'fs'

export function validateCodePath(projectPath) {
  return fs.promises.access(projectPath)
}
