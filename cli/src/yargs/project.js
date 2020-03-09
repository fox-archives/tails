import client from '../core/proto'

exports.command = 'project <command>'
exports.desc = 'edits projectsss'
exports.builder = function(yargs) {
  yargs.command('list', 'list all projects', () => {
    const projects = ['eat', 'eat', 'charlie']
    console.log(`your eats: ${projects}`)
  })

  yargs.command(
    'show [project]',
    'show a particular project',
    yargs => {
      yargs.positional('project', {
        type: 'string',
        default: 'myProject',
        describe: 'project name'
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
