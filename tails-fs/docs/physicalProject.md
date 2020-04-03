# `PhysicalProject`

this is meant to be a low level api (ex. it throws errors, that even if they could be dealt with on their own, aren't)

## exported items

```js
import { PhysicalProject } from 'tails-fs';
```

## related

you may also find useful

```js
// see common.md
import { TAILS_CONFIG_FILE, TAILS_ERROR } from 'tails-fs';
```

### `PhysicalProject`

#### `PhysicalProject.list(namespace)`

##### scenario

list all projects, or within a namespace

##### returns

- promise that resolves to something

##### can throw

- `InvalidArgumentError` with `err.category` as `project`
- `DoesNotExistError` with `err.category` as `project`
- `Error`

#### `PhysicalProject.show(project, namespace)`

##### scenario

when you want to show info about a project, (ex. if its a symlink)

##### returns

- promise that resolves to something

##### can throw

- `InvalidArgumentError` with `err.category` as `project`
- `DoesNotExistError` with `err.category` as `project`
- `Error`

#### `PhysicalProject.create(project, namespace)`

##### scenario

when you want to create a project (eg. a project folder)

##### returns

- promise that resolves to something

##### can throw

- `InvalidArgumentError` with `err.category` as `project`
- `DoesNotExistError` with `err.category` as `namespace`
- `AlreadyExistsError` with `err.category` as `project`
- `Error`

#### `PhysicalProject.delete(project, namespace)`

##### scenario

when you want to delete a project (eg. a project folder)

##### returns

- a promise that resolves to something

##### can throw

- `InvalidArgumentError` with `err.category` as `project`
- `DoesNotExistError` with `err.category` as `project`
- `Error`
