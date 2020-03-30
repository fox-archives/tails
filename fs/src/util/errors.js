// throws when namespaces / project do / don't exist
export class DoesNotExistError extends Error {}
export class AlreadyExistsError extends Error {}

// throws anytime invalid arguments or insufficient arguments are passed
// into a function
export class InvalidArgumentError extends Error {}
