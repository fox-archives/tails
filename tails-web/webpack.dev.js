import webpack from 'webpack'
import merge from 'webpack-merge'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import DashboardPlugin from 'webpack-dashboard/plugin'

// import {
//   friendlyErrorsAdditionalTransformers,
//   friendlyErrorsAdditionalFormatters
// } from './webpack.util'
import common from './webpack.common'

export default merge.strategy({
  'module.rules': 'prepend',
})(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.(css|postcss)$/,
        use: [
          {
            loader: 'vue-style-loader',
            options: {
              sourceMap: true,
              shadowMode: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      // additionalTransformers: [friendlyErrorsAdditionalTransformers],
      // additionalFormatters: [friendlyErrorsAdditionalFormatters]
    }),
    new DashboardPlugin(),
  ],
  devServer: {
    open: false,
    hot: true,
    port: 9010,
    compress: true,
    historyApiFallback: true,

    proxy: {
      changeOrigin: true,
      '/graphql': {
        target: 'http://localhost:9020',
      },
      '/api': {
        target: 'http://localhost:9020',
      },
    },
  },
})
