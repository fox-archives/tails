import { PhysicalNamespace, Config, TAILS_ERROR } from 'tails-fs'

import { isTailsRootDirSet } from '../util'

const TEXT_ROOT_DIR_NOT_SET = 'error: tails root directory not set'

export const command = 'physicalNamespace <command>'
export const desc = 'show or edit physicalNamespace information'
export const builder = function(yargs) {
  yargs.command('list', 'list all namespaces', async () => {
    try {
      if (!(await isTailsRootDirSet()))
        return console.log(TEXT_ROOT_DIR_NOT_SET)

      let namespaces = await PhysicalNamespace.list()
      console.log(namespaces)
    } catch (err) {
      console.log(err)
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
        if (!(await isTailsRootDirSet()))
          return console.log(TEXT_ROOT_DIR_NOT_SET)

        let namespace = await PhysicalNamespace.show(name)
        console.log(namespace)
      } catch (err) {
        if (err instanceof TAILS_ERROR.InvalidArgumentError) {
          if (err.message === 'name') {
            console.log(`error: invalid argument name '${name}'`)
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
        if (!(await isTailsRootDirSet()))
          return console.log(TEXT_ROOT_DIR_NOT_SET)

        await PhysicalNamespace.create(name)
        console.log(`created namespace: ${name}`)
      } catch (err) {
        if (err instanceof TAILS_ERROR.InvalidArgumentError) {
          if (err.message === 'name') {
            console.log(`error: invalid argument name '${name}'`)
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
        if (!(await isTailsRootDirSet()))
          return console.log(TEXT_ROOT_DIR_NOT_SET)

        await PhysicalNamespace.delete(name)
        console.log(`deleted namespace: ${name}`)
      } catch (err) {
        if (err instanceof TAILS_ERROR.InvalidArgumentError) {
          if (err.message === 'name') {
            console.log(`error: invalid argument name '${name}'`)
          } else {
            console.error(err)
          }
        } else {
          console.error(err)
        }
      }
    }
  )

  return yargs
}
