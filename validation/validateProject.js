import path from 'path'

// validates name of path that vscode will open up
export function validateProjectPath(projectPath) {
  return fs.promises.access(projectPath)
}
