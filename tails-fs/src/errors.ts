/**
 * you try and perform an operation (ex. delete) on _something_ that belongs to a specific _category_, but the _something_ does not exist
 *
 * ```js
 * new DoesNotExistError(category, something, reason)
 * new DoesNotExistError('namespace', 'css-projects')
 * new DoesNotExistError('project', 'react-es5-test')
 * new DoesNotExistError('config', undefined, reason)
 * new DoesNotExistError('config') // ~/.config/tails/tails.json
 * ```
 *
 * @property name: name of error
 * @property category: category of error
 * @property of: same value as second parameter when instantiating error (_something_). can be undefined
 * @property reason: optional argument to give more details
 */
export class DoesNotExistError extends Error {
  /* ex. ('namespace', 'my-cool-css-projects') */
  constructor(categoryOfThing: string, valueOfThing?: string, reason?: string) {
    let message
    if (valueOfThing) {
      message = `your operation on a '${categoryOfThing}', specifically, the '${valueOfThing}' ${categoryOfThing} failed because it does not exist`
    } else {
      // ex. when categoryOfThing is a 'config'
      message = `your operation on the '${categoryOfThing}' failed because it does not exist`
    }
    if (reason) message += `. this is because ${reason}`

    super(message)
    this.name = this.constructor.name
    // @ts-ignore
    this.category = categoryOfThing
    // @ts-ignore
    this.of = valueOfThing
    // @ts-ignore
    this.reason = reason
  }
}

/**
 * you try and perform an operation (ex. create) on _something_ that belongs to a specific _category_, but the _something_ already exists
 *
 * ```js
 * new AlreadyExistsError(category, something, reason)
 * new AlreadyExistsError('namespace', 'css-projects')
 * new AlreadyExistsError('project', 'react-es5-test')
 * new AlreadyExistsError('config', undefined, reason)
 * new AlreadyExistsError('config') // ~/.config/tails/tails.json
 * ```
 *
 * @property name
 * @property category
 * @property of
 * @property reason
 */
export class AlreadyExistsError extends Error {
  constructor(categoryOfThing: string, valueOfThing?: string, reason?: string) {
    let message
    if (valueOfThing) {
      message = `your operation on a '${categoryOfThing}, specifically the '${valueOfThing}' ${categoryOfThing} failed because it already exists`
    } else {
      message = `your operation on the '${categoryOfThing}' failed because it does not exist`
    }
    if (reason) message += `. this is because ${reason}`

    super(message)
    this.name = this.constructor.name
    // @ts-ignore
    this.category = categoryOfThing
    // @ts-ignore
    this.of = valueOfThing
    // @ts-ignore
    this.reason = reason
  }
}

/**
 * you try and perform a method call, but if found a certain (necessary) _argument_ missing, or the argument's _value_ is somehow not valid
 * throws anytime invalid arguments or insufficient arguments are passed into a functions
 *
 * ```js
 * new InvalidArgumentError(argument, value)
 * new InvalidArgumentError('project', '_my-project') // projects cannot have leading underscore
 * ```
 *
 * @property name
 * @property category
 * @property of
 * @property reason
 */
export class InvalidArgumentError extends Error {
  constructor(
    argumentName: string,
    argumentValue?: string | boolean,
    reason?: string
  ) {
    let message = `the argument could not be processed because the argument '${argumentName}' with value '${argumentValue}' is not valid`
    if (reason) message += `. this is because ${reason}`

    super(message)
    this.name = this.constructor.name
    // @ts-ignore
    this.category = argumentName
    // @ts-ignore
    this.of = argumentValue
    // @ts-ignore
    this.reason = reason
  }
}
