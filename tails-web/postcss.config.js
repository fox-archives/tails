module.exports = {
  syntax: require('postcss-scss')
  plugins: {
    require('postcss-import')
  }
  // plugins: {
  //   'postcss-import': {},
  //   autoprefixer: {},
  //   'postcss-preset-env': {
  //     stage: 1,
  //     autoprefixer: {
  //       grid: false,
  //     },
  //   },
  // },
}
