# physicalNamespace

documentation for the `tails-fs` cli module. this is meant to be a low level api

## exported items

```js
import {
  PhysicalNamespace
} from 'tails-fs'
```

### `PhysicalNamespace`

#### `PhysicalNamespace.list()`

lists all project namespaces

returns:

- promise that resolves to *array*, containing objects for each namespace folder

can throw:

- ``

#### `PhysicalNamespace.show()`

shows a project namespace

returns:

- a promise that resolves to an *object*, the namespace folder

can throw:

- ``

#### `PhysicalNamespace.create()`

creates a project namespace

returns:

- a promise that resolves to `undefined`

can throw:

- ``

#### `PhysicalNamespace.delete()`

deletes a project namespace

returns:

- a promise that resolves to `undefined`

can throw:

- ``
