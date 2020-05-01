// throws when namespaces / project do / don't exist
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

// throws anytime invalid arguments or insufficient arguments are passed
// into a functions
export class InvalidArgumentError extends Error {
  constructor(argumentName: string, argumentValue?: string | boolean, reason?: string) {
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
