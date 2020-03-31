module.exports = api => {
  const isTest = api.env('test')
  if (isTest) {
    return {
      plugins: ['@babel/transform-modules-commonjs']
    }
  }
  return {}
}
