# config

documentation for the `tails-fs` cli module. this is meant to be a low level api (ex. it throws errors that can be automatically dealt with on their own (eg. writing a key to a non-existing tails config does not automatically create the config file))

not sure if this extends to `namespace.js` and `project.js`; i haven't written documentation for that

## exported items

```js
import {
  Config,
  TAILS_CONFIG_FILE
} from 'tails-fs'
```

### Config

#### `Config.show()`

returns:

- promise that resolves to object that represents the config file

can throw:

- `DoesNotExistError` with `err.message` as `config`

#### `Config.create()`

creates config with empty json object

returns:

- promise that resolves to `undefined`

can throw:

- `AlreadyExistsError` with `err.message` as `config`

#### `Config.delete()`

deletes config

returns:

- promise that resolves to `undefined`

can throw:

- `DoesNotExistError` with `err.message` as `config`

#### `Config.get(key)`

returns:

- promise that resolves to value of key

can throw:

- `DoesNotExistError` with `err.message` as `config`
- `InvalidArgumentError` with `err.message` as `key`

#### `Config.set(key, value, isForce)`

returns:

- promise that resolves to `undefined`

can throw:

- `DoesNotExistError` with `err.message` as `config`
- `DoesNotExistError` with `err.message` as `key`
- `InvalidArgumentError` with `err.message` as `key`
- `InvalidArgumentError` with `err.message` as `force`

### `TAILS_CONFIG_FILE`

exported constant variable that gives location of tails config file. here is how it resolves:

1. if `process.env.TAILS_CONFIG_DIR` is set, relative to that, it resolves to `./tails.json`
1. if `process.env.XDG_CONFIG_HOME` is set, relative to that, it resolves to `./tails/tails.json`
2. if `process.env.XDG_CONFIG_HOME` is not set, relative to `process.env.HOME|HOMEPATH|USERPROFILE`, it resolves to `./.config/tails/tails.json`
