import { PhysicalNamespace } from 'tails-fs'

import { handleError } from '../util'

export const command = 'physicalNamespace <command>'
export const desc = 'show or edit physicalNamespace information'
export const builder = function (yargs) {
  yargs.command('list', 'list all namespaces', async () => {
    try {
      let namespaces = await PhysicalNamespace.list()
      console.log(namespaces)
    } catch (err) {
      handleError(err)
    }
  })

  yargs.command(
    'show [namespace]',
    'show a namespace',
    (yargs) => {
      yargs.positional('name', {
        type: 'string',
        describe: 'name of namespace',
      })
    },
    async (argv) => {
      const name = argv.name

      try {
        let namespace = await PhysicalNamespace.show(name)
        console.log(namespace)
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  yargs.command(
    'create [namespace]',
    'create a namespace',
    (yargs) => {
      yargs.positional('name', {
        type: 'string',
        describe: 'name of namespace',
      })
    },
    async (argv) => {
      const name = argv.name

      try {
        await PhysicalNamespace.create(name)
        console.log(`created namespace: ${name}`)
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  yargs.command(
    'delete [namespace]',
    'delete a namespace',
    (yargs) => {
      yargs.positional('name', {
        type: 'string',
        describe: 'name of namespace',
      })
    },
    async (argv) => {
      const name = argv.name

      try {
        await PhysicalNamespace.delete(name)
        console.log(`deleted namespace: ${name}`)
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  return yargs
}
