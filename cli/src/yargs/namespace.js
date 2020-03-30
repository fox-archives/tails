import { Namespace } from '../core/grpc'

const namespace = (new Namespace).instance

exports.command = 'namespace <command>'
exports.desc = 'show or edit namespace information'
exports.builder = function(yargs) {
  yargs.command('list', 'list all namespaces', () => {
    console.log(namespace)
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
        client.showProject(
          {
            name: argv.project
          },
          (err, response) => {
            if (err) return console.error(err), reject()

            console.table({
              original: argv.project,
              returned: response.name,
              returned2: response.prop
            })
            resolve()
          }
        )
      })
    }
  )

  return yargs
}
