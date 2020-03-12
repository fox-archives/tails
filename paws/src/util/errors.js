// Refactor and remove 'PhysicalProject' from StorageReadError
// throws on failure to read the directory that contains all projects
// this is usually RUNTIME_CONFIG.TAILS_PROJECT_DIR. it is also thrown
// when we read a subdirectory of said directory that contains more
// projects (these are prefixed with an underscore)
export class StorageReadError extends Error {}

// throws when tries to get information about a project, but that
// project does not exist. it should also throw is trying to set
// information about a project, but the project does not exist
export class PhysicalProjectNotFoundError extends Error {}

// throws when trying to create a project, but the project already
// exists on the file system
export class PhysicalProjectAlreadyExistsError extends Error {}


export class NamespaceNotFoundError extends Error {}
export class NamespaceAlreadyExistsError extends Error{}

// throws anytime invalid arguments or insufficient arguments are passed
// into a function. if this function is being called by a grpc, it should
// be bubbled up as a grpc.status.INVALID_ARGUMENT
export class InvalidArgumentError extends Error {}
