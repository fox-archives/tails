import { PhysicalNamespace } from 'tails-fs'

import yargs from 'yargs/index'

import { handleError, printSuccess } from '../util'

export const command = 'physicalNamespace <command>'
export const aliases = ['pns']
export const desc = 'show or edit physicalNamespace information'
// @ts-ignore
export const builder = function (yargs: yargs.Argv) {
  yargs.command('list', 'list all namespaces', async () => {
    try {
      let namespaces = await PhysicalNamespace.list()
      console.log(namespaces)
    } catch (err) {
      handleError(err)
    }
  })

  yargs.command(
    'show <namespace>',
    'show a namespace',
    (yargs) => {
      yargs.positional('namespace', {
        type: 'string',
        describe: 'name of namespace',
      })
    },
    async (argv) => {
      const namespace = argv.namespace

      try {
        let namespaceObject = await PhysicalNamespace.show(namespace)
        console.log(namespaceObject)
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  yargs.command(
    'create <namespace>',
    'create a namespace',
    (yargs) => {
      yargs.positional('namespace', {
        type: 'string',
        describe: 'name of namespace',
      })
    },
    async (argv) => {
      const namespace = argv.namespace

      try {
        await PhysicalNamespace.create(namespace)
        printSuccess(`created namespace '${namespace}'`)
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  yargs.command(
    'delete <namespace>',
    'delete a namespace',
    (yargs) => {
      yargs.positional('namespace', {
        type: 'string',
        describe: 'name of namespace',
      })
    },
    async (argv) => {
      const namespace = argv.namespace

      try {
        await PhysicalNamespace.delete(namespace)
        printSuccess(`deleted namespace '${namespace}'`)
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  yargs.example(
    '$0 physicalNamespace show myNamespace',
    'show the physical namespace myNamespace'
  )
  yargs.example(
    '$0 physicalNamespace delete myNamespace',
    'delete the physicalNamespace myNamespace'
  )

  return yargs
}
