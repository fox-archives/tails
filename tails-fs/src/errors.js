// throws when namespaces / project do / don't exist
export class DoesNotExistError extends Error {
  /* ex. ('namespace', 'my-cool-css-projects') */
  constructor(categoryOfThing, valueOfThing, reason) {
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
    this.category = categoryOfThing
    this.of = valueOfThing
    this.reason = reason
  }
}

export class AlreadyExistsError extends Error {
  constructor(categoryOfThing, valueOfThing, reason) {
    let message
    if (valueOfThing) {
      message = `your operation on a '${categoryOfThing}, specifically the '${valueOfThing}' ${categoryOfThing} failed because it already exists`
    } else {
      message = `your operation on the '${categoryOfThing}' failed because it does not exist`
    }
    if (reason) message += `. this is because ${reason}`

    super(message)
    this.name = this.constructor.name
    this.category = categoryOfThing
    this.of = valueOfThing
    this.reason = reason
  }
}

// throws anytime invalid arguments or insufficient arguments are passed
// into a functions
export class InvalidArgumentError extends Error {
  constructor(argumentName, argumentValue, reason) {
    const message = `the argument could not be processed because the argument '${argumentName}' with value '${argumentValue}' is not valid`
    if (reason) message += `. this is because ${reason}`

    super(message)
    this.name = this.constructor.name
    this.category = argumentName
    this.of = argumentValue
    this.reason = reason
  }
}
