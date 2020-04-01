import { Config, TAILS_ERROR } from 'tails-fs'

const CONFIG_NO_EXISTS_CREATE_ONE =
  "error: config file. create one with 'tails config create'"

export const command = 'config <command>'
export const desc = 'show or edit tails configuration items'
export const builder = function(yargs) {
  yargs.command('show', 'shows the whole config', async () => {
    try {
      let config = await Config.show()
      console.log(`config: ${JSON.stringify(config)}`)
    } catch (err) {
      if (err instanceof TAILS_ERROR.DoesNotExistError) {
        console.log(CONFIG_NO_EXISTS_CREATE_ONE)
      } else {
        console.error(err)
      }
    }
  })

  yargs.command('create', 'create a blank config', async () => {
    try {
      await Config.create()
      console.log('config created')
    } catch (err) {
      if (err instanceof TAILS_ERROR.AlreadyExistsError) {
        console.log('error: config already exists')
      } else {
        console.error(err)
      }
    }
  })

  yargs.command('delete', 'delete the whole config', async () => {
    try {
      await Config.delete()
      console.log('config deleted')
    } catch (err) {
      if (err instanceof TAILS_ERROR.DoesNotExistError) {
        console.log(CONFIG_NO_EXISTS_CREATE_ONE)
      } else {
        console.error(err)
      }
    }
  })

  yargs.command(
    'get',
    'get key in config',
    yargs => {
      yargs.positional('key', {
        type: 'string',
        describe: 'key to get'
      })
    },
    async argv => {
      const key = argv.key

      try {
        const value = await Config.get(key)
        console.log(`key '${key}' has value '${value}'`)
      } catch (err) {
        if (err instanceof TAILS_ERROR.InvalidArgumentError) {
          if (err.message == 'key') {
            console.log(`error: invalid argument value '${key}'`)
          } else {
            console.error(err)
          }
        } else if (err instanceof TAILS_ERROR.DoesNotExistError) {
          if (err.message === 'store') {
            console.log(CONFIG_NO_EXISTS_CREATE_ONE)
          }
          if (err.message === 'key') {
            console.log(`error: key '${key}' does not exist`)
          } else {
            console.error(err)
          }
        } else {
          console.error(err)
        }
      }
    }
  )

  yargs.command(
    'set',
    'set key in config',
    yargs => {
      yargs.positional('key', {
        type: 'string',
        default: '',
        describe: 'key to set'
      })

      yargs.positional('value', {
        type: 'string',
        default: '',
        describe: 'value to set'
      })
    },
    async argv => {
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
        if (err instanceof TAILS_ERROR.InvalidArgumentError) {
          if (err.message === 'key') {
            console.log(`error: invalid argument key '${key}'`)
          } else if (err.message === 'force') {
            console.log(
              `error: invalid argument. when setting key with no value, pass '-f`
            )
          } else {
            console.error(err)
          }
        } else if (err instanceof TAILS_ERROR.DoesNotExistError) {
          if (err.message === 'store') {
            console.log(CONFIG_NO_EXISTS_CREATE_ONE)
          } else if (err.message === 'key') {
            console.log(`error: key '${key}' does not exist`)
          } else {
            console.error(err)
          }
        } else {
          console.error(err)
        }
      }
    }
  )
}
