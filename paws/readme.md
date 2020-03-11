# Paws

`paws` edits files on the local file system. this is separate from `operator` because `operator` may be running on a separate machine. `paws` is always ran on a local machine and should only talk with `coordinator`

more specifically, it is responsible for doing the following on the local filesystem

- querying information about projects
- creating / modifying projects
- for any project, it may also do
  - scaffolding
  - bootstrapping
  - boilerplate configuration

## Scripts

all scripts in `package.json`
