import { Config } from 'tails-fs'

import { handleError } from '../util'

export const command = 'config <command>'
export const desc = 'show or edit tails configuration items'
export const builder = function (yargs) {
  yargs.command('show', 'shows the whole config', async (argv) => {
    try {
      let config = await Config.show()
      console.log(`config: ${JSON.stringify(config)}`)
    } catch (err) {
      handleError(err, argv)
    }
  })

  yargs.command('create', 'create a blank config', async (argv) => {
    try {
      await Config.create()
      console.log('config created')
    } catch (err) {
      handleError(err, argv)
    }
  })

  yargs.command('delete', 'delete the whole config', async (argv) => {
    try {
      await Config.delete()
      console.log('config deleted')
    } catch (err) {
      handleError(err, argv)
    }
  })

  yargs.command(
    'get',
    'get key in config',
    (yargs) => {
      yargs.positional('key', {
        type: 'string',
        describe: 'key to get',
      })
    },
    async (argv) => {
      const key = argv.key

      try {
        const value = await Config.get(key)
        console.log(`key '${key}' has value '${value}'`)
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  yargs.command(
    'set',
    'set key in config',
    (yargs) => {
      yargs.positional('key', {
        type: 'string',
        default: '',
        describe: 'key to set',
      })

      yargs.positional('value', {
        type: 'string',
        default: '',
        describe: 'value to set',
      })
    },
    async (argv) => {
      const key = argv.key
      const value = argv.value
      const isForce = argv.f

      try {
        await Config.set(key, value, isForce)

        if (isForce) {
          console.log(`key '${key}' deleted`)
        } else {
          console.log(`key '${key}' set with value '${value}'`)
        }
      } catch (err) {
        handleError(err, argv)
      }
    }
  )
}
