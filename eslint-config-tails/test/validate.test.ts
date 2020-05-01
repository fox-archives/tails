import eslint from 'eslint'

import config from '../src/index'

test('config has basic properties', () => {
  expect(config).toBeObject()
  expect(config.parserOptions).toBeObject()
  expect(config.env).toBeObject()
  expect(config.env).toContainKey('node')
  expect(config.plugins).toBeArray()
  expect(config.extends).toBeArray()
  expect(config.rules).toBeObject()
})

test('eslint engine evaluates config file', () => {
  let CLIEngine = eslint.CLIEngine

  let cli = new CLIEngine({
    useEslintrc: false,
    configFile: '.eslintrc.json',
  })

  const code = 'let foo = 1\nlet bar = function () {}\nbar(foo)\n'

  expect(cli.executeOnText(code).errorCount).toBe(0)
})
