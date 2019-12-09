import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand'

export function initEnv() {
  const env = dotenv.config()
  dotenvExpand(env)
}
