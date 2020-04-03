# `Config`

this is meant to be a low level api (ex. it throws errors, that even if they could be dealt with on their own, aren't)

## exported items

```js
import { Config } from 'tails-fs';
```

## related

you may also find useful

```js
// see common.md
import { TAILS_CONFIG_FILE, TAILS_ERROR } from 'tails-fs';
```

### Config

#### `Config.show()`

##### scenario

shows config in its entirety

##### returns

- promise that resolves to object that represents the config file

#### can throw

- `DoesNotExistError` with `err.category` as `config`
- `Error`

#### `Config.create()`

##### scenario

creates config with empty json object

##### returns

- promise that resolves to `undefined`

#### can throw

- `AlreadyExistsError` with `err.category` as `config`
- `Error`

#### `Config.delete()`

##### scenario

deletes config

##### returns

- promise that resolves to `undefined`

#### can throw

- `DoesNotExistError` with `err.category` as `config`
- `Error`

#### `Config.get(key)`

##### scenario

gets key from config

##### returns

- promise that resolves to _string_, value of key

#### can throw

- `DoesNotExistError` with `err.category` as `config`
- `InvalidArgumentError` with `err.category` as `key`
- `Error`

#### `Config.set(key, value, isForce)`

##### scenario

set key in config

##### returns

- promise that resolves to `undefined`

#### can throw

- `DoesNotExistError` with `err.category` as `config`
- `DoesNotExistError` with `err.category` as `key`
- `InvalidArgumentError` with `err.category` as `key`
- `InvalidArgumentError` with `err.category` as `force`
- `Error`
