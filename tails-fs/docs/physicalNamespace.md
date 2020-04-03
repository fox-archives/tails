# `PhysicalNamespace`

this is meant to be a low level api (ex. it throws errors, that even if they could be dealt with on their own, aren't)

## exported items

```js
import { PhysicalNamespace } from 'tails-fs'
```

## related

you may also find useful

```js
// see common.md
import { TAILS_CONFIG_FILE, TAILS_ERROR } from 'tails-fs'
```

### `PhysicalNamespace`

#### `PhysicalNamespace.list()`

##### scenario

lists all project namespaces

##### returns

- promise that resolves to _array_, containing objects for each namespace folder

##### can throw

- `Error`

#### `PhysicalNamespace.show(name)`

##### scenario

shows a project namespace

##### returns

- a promise that resolves to an _object_, the namespace folder

##### can throw

- `InvalidArgumentError` with `err.category` as `namespace`
- `DoesNotExistError` with `err.category` as `namespace`
- `Error`

#### `PhysicalNamespace.create(namespace)`

##### scenario

creates a project namespace

##### returns

- a promise that resolves to `undefined`

#### can throw

- `InvalidArgumentError` with `err.category` as `namespace`
- `AlreadyExistsError` with `err.category` as `namespace`
- `Error`

#### `PhysicalNamespace.delete(namespace)`

##### scenario

deletes a project namespace

##### returns

- a promise that resolves to `undefined`

#### can throw

- `InvalidArgumentError` with `err.category` as `namespace`
- `DoesNotExistError` with `err.category` as `namespace`
