// throws when namespaces / project do / don't exist
export class DoesNotExistError extends Error {
  /* ex. ('namespace', 'my-cool-css-projects') */
  constructor(categoryOfThing, valueOfThing) {
    let message
    if (valueOfThing) {
      message = `your operation on a '${categoryOfThing}', specifically, the '${valueOfThing}' ${categoryOfThing} failed because it does not exist`
    } else {
      // ex. when categoryOfThing is a 'config'
      message = `your operation on the '${categoryOfThing}' failed because it does not exist`
    }
    super(message)
    this.name = this.constructor.name
    this.category = categoryOfThing
  }
}

export class AlreadyExistsError extends Error {
  constructor(categoryOfThing, valueOfThing) {
    let message
    if (categoryOfThing) {
      message = `your operation on a '${categoryOfThing}, specifically the ${valueOfThing}' ${categoryOfThing} failed because it already exists`
    } else {
      message = `your operation on the '${categoryOfThing}' failed because it does not exist`
    }
    super(message)
    this.name = this.constructor.name
    this.category = categoryOfThing
  }
}

// throws anytime invalid arguments or insufficient arguments are passed
// into a functions
export class InvalidArgumentError extends Error {
  constructor(argumentName, argumentValue) {
    const message = `the argument could not be processed because the argument '${argumentName}' with value '${argumentValue}' is not valid`
    super(message)
    this.name = this.constructor.name
    this.what = argumentName
  }
}

// throws when there is no config, or cannot read config etc.
export class InvalidConfigError extends Error {
  constructor() {
    const message = `you tried to perform an operation that required reading the global config, but there was an error while doing so`
    super(message)
    this.name = this.constructor.name
  }
}
