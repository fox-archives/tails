export const command = 'physicalProject <command>'
export const desc = 'show or edit physicalProject information'
export const builder = function(yargs) {
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
        resolve('brav')
      })
    }
  )

  return yargs
}
