// @ts-ignore
import { PhysicalProject } from 'tails-fs'

import yargs from 'yargs/index'

import { handleError, printSuccess } from '../util'

export const command = 'physicalProject <command>'
export const aliases = ['pproj']
export const desc = 'show or edit physicalProject information'
// @ts-ignore
export const builder = function (yargs: yargs.Argv) {
  yargs.command(
    'list',
    'list all projects',
    (yargs) => {
      yargs.positional('namespace', {
        type: 'string',
        describe: 'project name',
      })
    },
    async (argv) => {
      let namespace = argv.namespace

      try {
        let projects = await PhysicalProject.list(namespace)
        console.log(projects)
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  yargs.command(
    'show <project>',
    'show a project',
    (yargs) => {
      yargs.positional('project', {
        type: 'string',
        describe: 'name of your project',
      })

      yargs.option('namespace', {
        type: 'string',
        describe: 'namespace project is in',
        nargs: 1,
        demand: false,
      })
    },
    async (argv) => {
      const project = argv.project
      const namespace = argv.namespace

      try {
        let projectObject = await PhysicalProject.show(project, namespace)
        console.log(projectObject)
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  yargs.command(
    'create <project>',
    'create a project',
    (yargs) => {
      yargs.positional('project', {
        type: 'string',
        describe: 'name of your project',
      })

      yargs.option('namespace', {
        type: 'string',
        describe: 'namespace project is in',
        nargs: 1,
        demand: false,
      })
    },
    async (argv) => {
      const project = argv.project
      const namespace = argv.namespace

      try {
        await PhysicalProject.create(project, namespace)
        if (!namespace) {
          printSuccess(`created project '${project}'`)
        }
        {
          printSuccess(
            `created project '${project}' in namespace '${namespace}`
          )
        }
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  yargs.command(
    'delete <project>',
    'delete a project',
    (yargs) => {
      yargs.positional('project', {
        type: 'string',
        describe: 'name of your project',
      })

      yargs.option('namespace', {
        type: 'string',
        describe: 'namespace project is in',
        nargs: 1,
        demand: false,
      })
    },
    async (argv) => {
      const project = argv.project
      const namespace = argv.namespace

      try {
        await PhysicalProject.delete(project, namespace)
        if (!namespace) {
          printSuccess(`deleted project '${project}'`)
        } else {
          printSuccess(
            `created project '${project}' in namespace '${namespace}'`
          )
        }
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  yargs.example('$0 physicalProject show myProject', 'create the project myProject')
  yargs.example('$0 physicalProject create myProject --namespace myNamespace', 'create the project myProject within myNamespace')
  yargs.example('$0 physicalProject create myProject', 'create the project myProject inside no namespace')

  return yargs
}
