import * as tailsFs from 'tails-fs'

export const command = 'physicalNamespace <command>'
export const desc = 'show or edit physicalNamespace information'
export const builder = function(yargs) {
  yargs.command('list', 'list all namespaces', () => {
    console.log('f')
  })

  yargs.command(
    'show [namespace]',
    'show a particular namespace',
    yargs => {
      yargs.positional('project', {
        type: 'string',
        default: 'myNamespace',
        describe: 'namespace name'
      })
    },
    argv => {
      return new Promise((resolve, reject) => {
        resolve('foo')
      })
    }
  )

  return yargs
}
