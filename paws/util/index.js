import fs from 'fs'
import path from 'path'
import toml from 'toml'

const dotFile = '.tails.toml'

export async function getConfig(projectDir) {
  const configFile = path.join(projectDir, dotFile)
  const raw = await fs.promises.readFile(configFile)
  const cfg = toml.parse(raw)
  return cfg
}
