module.exports = {
  plugins: {
    'postcss-import': {},
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 1,
      autoprefixer: {
        grid: false,
      },
    },
  },
}
