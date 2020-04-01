import { PhysicalNamespace, TAILS_ERROR } from 'tails-fs'

const CONFIG_NO_EXIST =
  'error: config file cannot be read. ensure it is created and is valid'

export const command = 'physicalNamespace <command>'
export const desc = 'show or edit physicalNamespace information'
export const builder = function(yargs) {
  yargs.command('list', 'list all namespaces', async () => {
    try {
      let namespaces = await PhysicalNamespace.list()
      console.log(namespaces)
    } catch (err) {
      if (err instanceof TAILS_ERROR.InvalidConfigError) {
        console.log(CONFIG_NO_EXIST)
      } else {
        console.error(err)
      }
    }
  })

  yargs.command(
    'show [namespace]',
    'show a namespace',
    yargs => {
      yargs.positional('name', {
        type: 'string',
        describe: 'name of namespace'
      })
    },
    async argv => {
      const name = argv.name

      try {
        let namespace = await PhysicalNamespace.show(name)
        console.log(namespace)
      } catch (err) {
        if (err instanceof TAILS_ERROR.InvalidArgumentError) {
          if (err.message === 'name') {
            console.log(`error: invalid argument name '${name}'`)
          } else {
            console.error(err)
          }
        } else if (err instanceof TAILS_ERROR.InvalidConfigError) {
          console.log(CONFIG_NO_EXIST)
        } else {
          console.error(err)
        }
      }
    }
  )

  yargs.command(
    'create [namespace]',
    'create a namespace',
    yargs => {
      yargs.positional('name', {
        type: 'string',
        describe: 'name of namespace'
      })
    },
    async argv => {
      const name = argv.name

      try {
        await PhysicalNamespace.create(name)
        console.log(`created namespace: ${name}`)
      } catch (err) {
        if (err instanceof TAILS_ERROR.InvalidArgumentError) {
          if (err.message === 'name') {
            console.log(`error: invalid argument name '${name}'`)
          } else {
            console.error(err)
          }
        } else if (err instanceof TAILS_ERROR.InvalidConfigError) {
          console.log(CONFIG_NO_EXIST)
        } else {
          console.error(err)
        }
      }
    }
  )

  yargs.command(
    'delete [namespace]',
    'delete a namespace',
    yargs => {
      yargs.positional('name', {
        type: 'string',
        describe: 'name of namespace'
      })
    },
    async argv => {
      const name = argv.name

      try {
        await PhysicalNamespace.delete(name)
        console.log(`deleted namespace: ${name}`)
      } catch (err) {
        if (err instanceof TAILS_ERROR.InvalidArgumentError) {
          if (err.message === 'name') {
            console.log(`error: invalid argument name '${name}'`)
          } else {
            console.error(err)
          }
        } else if (err instanceof TAILS_ERROR.InvalidConfigError) {
          console.log(CONFIG_NO_EXIST)
        } else {
          console.error(err)
        }
      }
    }
  )

  return yargs
}
