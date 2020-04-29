// @ts-ignore
import { Config } from 'tails-fs'

import yargs from 'yargs/index'

import { handleError, printSuccess } from '../util'

export const command = 'config <command>'
export const aliases = ['cfg']
export const desc = 'show or edit tails configuration items'
// @ts-ignore
export const builder = function (yargs: yargs.Argv) {
  yargs.command('show', 'show the whole config', async (argv) => {
    try {
      let config = await Config.show()
      console.log(config)
    } catch (err) {
      handleError(err, argv)
    }
  })

  yargs.command('create', 'create a blank config', async (argv) => {
    try {
      await Config.create()
      printSuccess('config created')
    } catch (err) {
      handleError(err, argv)
    }
  })

  yargs.command('delete', 'delete the whole config', async (argv) => {
    try {
      await Config.delete()
      printSuccess('config deleted')
    } catch (err) {
      handleError(err, argv)
    }
  })

  yargs.command(
    'get <key>',
    'get a key from the config',
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
        printSuccess(`key '${key}' has value '${value}'`)
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  yargs.command(
    'set <key>',
    'set a key from the config',
    (yargs) => {
      yargs.positional('key', {
        type: 'string',
        describe: 'key to set',
        implies: 'value',
      })

      yargs.option('value', {
        type: 'string',
        describe: 'value to set',
        nargs: 1,
        demand: true,
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

  yargs.command('find', 'find the location of the config', async (argv) => {
    try {
      const location = await Config.find()
      console.log(location)
    } catch (err) {
      handleError(err, argv)
    }
  })

  yargs.example('$0 config get myKey', 'get the value of myKey')
  yargs.example('$0 config set myKey --value myValue', 'set the value of myKey with myValue')
}
