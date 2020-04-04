import c from 'ansi-colors'

import { TAILS_ERROR } from 'tails-fs'

function printError(text) {
  console.error(c.red(text))
}

export function handleError(err, argv) {
  const key = argv.key
  const value = argv.value
  const isForce = argv.f
  const name = argv.name
  const namespace = argv.namespace

  if (err instanceof TAILS_ERROR.InvalidArgumentError) {
    if (err.category === 'key') {
      printError(`error: invalid argument value '${key}'`)
    } else if (err.category === 'force') {
      printError(
        `error: invalid argument. when setting key with no value, pass '-f`
      )
    } else if (err.category === 'name') {
      printError(`error: invalid argument name '${name}'`)
    } else {
      console.error(err)
    }
    return
  }

  if (err instanceof TAILS_ERROR.AlreadyExistsError) {
    if (err.category === 'config') {
      printError('error: config already exists')
    } else if (err.category === 'name') {
      printError(`error: name ${name} already exists`)
    } else {
      console.error(err)
    }
    return
  }

  if (err instanceof TAILS_ERROR.DoesNotExistError) {
    if (err.category === 'config') {
      printError("error: config file. create one with 'tails config create'")
    } else if (err.category === 'name') {
      printError(`error: name '${name}' does not exist`)
    } else if (err.category === 'key') {
      printError(`error: key '${key}' does not exist`)
    } else if (err.category === 'namespace') {
      printError(`error: namespace '${namespace}' does not exist`)
    } else {
      printError(err)
    }
    return
  }

  console.error(err)
}

export function handlePhysicalNamespaceError(err) {}
