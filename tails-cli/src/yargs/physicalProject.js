import { PhysicalProject } from 'tails-fs'

import { handleError } from '../util'

export const command = 'physicalProject <command>'
export const desc = 'show or edit physicalProject information'
export const builder = function (yargs) {
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
    'show [project]',
    'show a project',
    (yargs) => {
      yargs.positional('name', {
        type: 'string',
        describe: 'project name',
      })

      yargs.positional('namespace', {
        type: 'string',
        describe: 'namespace project is in',
      })
    },
    async (argv) => {
      const name = argv.name
      const namespace = argv.namespace

      try {
        let project = await PhysicalProject.show(name, namespace)
        console.log(project)
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  yargs.command(
    'create [project]',
    'create a project',
    (yargs) => {
      yargs.positional('name', {
        type: 'string',
        describe: 'project name',
      })

      yargs.positional('namespace', {
        type: 'string',
        describe: 'namespace project is in',
      })
    },
    async (argv) => {
      const name = argv.name
      const namespace = argv.namespace

      try {
        await PhysicalProject.create(name, namespace)
        console.log(`created project ${name}`)
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  yargs.command(
    'delete [project]',
    'delete a project',
    (yargs) => {
      yargs.positional('name', {
        type: 'string',
        describe: 'project name',
      })

      yargs.positional('namespace', {
        type: 'string',
        describe: 'namespace project is in',
      })
    },
    async (argv) => {
      const name = argv.name
      const namespace = argv.namespace

      try {
        await PhysicalProject.delete(name, namespace)
        console.log(`deleted project ${name}`)
      } catch (err) {
        handleError(err, argv)
      }
    }
  )

  return yargs
}
