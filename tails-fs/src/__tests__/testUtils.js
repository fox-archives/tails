import { Config } from '../config'

export async function setConfig(config) {
  await Config.create()
  for (let property in config) {
    await Config.set(property, config[property])
  }
}
