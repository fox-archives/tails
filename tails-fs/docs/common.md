# common

exported items that may be useful for all exported objects

## exported items

### `TAILS_CONFIG_FILE`

exported constant variable that gives location of tails config file. here is how it resolves:

1. if `process.env.TAILS_CONFIG_DIR` is set, relative to that, it resolves to `./tails.json`
1. if `process.env.XDG_CONFIG_HOME` is set, relative to that, it resolves to `./tails/tails.json`
1. if `process.env.XDG_CONFIG_HOME` is not set, relative to `process.env.HOME|HOMEPATH|USERPROFILE`, it resolves to `./.config/tails/tails.json`

### `TAILS_ERROR`

we have four errors

#### `DoesNotExistError`

##### scenario

you try and perform an operation (ex. delete) on _something_ that belongs to a specific _category_, but the _something_ does not exist

##### usage

```js
new DoesNotExistError(category, something, reason)
new DoesNotExistError('namespace', 'css-projects')
new DoesNotExistError('project', 'react-es5-test')
new DoesNotExistError('config', undefined, reason)
new DoesNotExistError('config') // ~/.config/tails/tails.json
```

##### properties

- `name`: name of error
- `category`: category of error
- `of`: same value as second parameter when instantiating error (_something_). can be undefined
- `reason`: optional argument to give more details

#### `AlreadyExistsError`

##### scenario

you try and perform an operation (ex. create) on _something_ that belongs to a specific _category_, but the _something_ already exists

##### usage

```js
new AlreadyExistsError(category, something, reason)
new AlreadyExistsError('namespace', 'css-projects')
new AlreadyExistsError('project', 'react-es5-test')
new AlreadyExistsError('config', undefined, reason)
new AlreadyExistsError('config') // ~/.config/tails/tails.json
```

##### properties

- `name`: name of error
- `category`: category of error
- `of`: same value as second parameter when instantiating error (_something_). can be undefined
- `reason`: optional argument to give more details

#### `InvalidArgumentError`

#### scenario

you try and perform a method call, but if found a certain (necessary) _argument_ missing, or the argument's _value_ is somehow not valid

#### usage

```js
new InvalidArgumentError(argument, value)
new InvalidArgumentError('project', '_my-project') // projects cannot have leading underscore
```

##### properties

- `name`: name of error
- `category`: category of error
- `of`: same value as second parameter when instantiating error (_something_)
- `reason`: optional argument to give more details

#### `InvalidConfigError`

### scenario

you try (or indirectly) try to access the global config `~/.config/tails/tails.json`, but it is missing or corrupted, or invalid in some other way

##### usage

```js
new InvalidConfigError()
```

##### properties

- `name`: name of error
