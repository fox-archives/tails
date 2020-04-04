var e = (async () =>
    await Promise.resolve().then(function () {
      return i
    }))(),
  r = {
    parser: 'babel-eslint',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { impliedStrict: !0 },
    env: { node: !0, es2020: !0, jest: !0, 'jest/globals': !0 },
  },
  t = { es6: !0, node: !0 },
  n = ['simple-import-sort', 'no-use-extend-native', 'no-secrets', 'prettier'],
  o = {
    'simple-import-sort/sort': 'error',
    'sort-imports': 'off',
    'import/order': 'off',
    'no-use-extend-native/no-use-extend-native': 'error',
    'no-secrets/no-secrets': ['error', { tolerance: 4 }],
    'prettier/prettier': 'warn',
  },
  s = {
    parserOptions: r,
    env: t,
    plugins: n,
    extends: [
      'eslint:recommended',
      'plugin:promise/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:jest/recommended',
      'plugin:jest/style',
      'plugin:monorepo/recommended',
    ],
    rules: o,
  },
  i = Object.freeze({
    __proto__: null,
    parserOptions: r,
    env: t,
    plugins: n,
    rules: o,
    default: s,
  })
export default e
