import c from 'ansi-colors'

import { TAILS_ERROR } from 'tails-fs'

function printError(text) {
  console.error(c.red('error: ' + text))
}

export function printSuccess(text) {
  console.log(c.green(text))
}

export function handleError(err, argv) {
  const key = argv.key
  const project = argv.project
  const namespace = argv.namespace

  if (err instanceof TAILS_ERROR.AlreadyExistsError) {
    if (err.category === 'config') {
      printError('config already exists')
    } else if (err.category === 'project') {
      printError(`project '${project}' already exists`)
    } else if (err.category === 'namespace') {
      printError(`namespace '${namespace}' does not exist`)
    } else {
      console.error(err)
    }
    return
  }

  if (err instanceof TAILS_ERROR.DoesNotExistError) {
    if (err.category === 'config') {
      printError("config file. create one with 'tails config create'")
    } else if (err.category === 'project') {
      printError(`project '${project}' does not exist`)
    } else if (err.category === 'namespace') {
      printError(`namespace '${namespace}' does not exist`)
    } else if (err.category === 'key') {
      printError(`key '${key}' does not exist`)
    } else {
      console.log(err)
    }
    return
  }

  if (err instanceof TAILS_ERROR.InvalidArgumentError) {
    printError('you somehow passed invalid arguments. this was not supposed to happen')
    console.error(err)
    return
  }

  console.error(err)
}

export function handlePhysicalNamespaceError(err) {}
