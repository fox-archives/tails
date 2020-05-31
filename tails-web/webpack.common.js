import path from 'path'

import sass from 'sass'
import fibers from 'fibers'
import webpack from 'webpack'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import PreloadWebpackPlugin from 'preload-webpack-plugin'
import ResourceHintWebpackPlugin from 'resource-hints-webpack-plugin'
// import ObsoleteWebpackPlugin from 'obsolete-webpack-plugin'
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin'
import { WebpackNoModulePlugin } from 'webpack-nomodule-plugin'
import PnpWebpackPlugin from 'pnp-webpack-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'

const isDev = process.env.NODE_ENV === 'development'

export default {
  entry: {
    app: path.join(__dirname, 'src/main.js'),
    styles: path.join(__dirname, 'src/global.css'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].[hash].bundle.js',
    chunkFilename: 'js/[name].[hash].bundle.js',
    publicPath: '/',
    crossOriginLoading: 'anonymous', // for SriPlugin
  },
  module: {
    // TODO: investiage
    exprContextCritical: false,
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                whitespace: 'condense',
              },
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              importLoaders: 2,
            },
          },
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     sourceMap: isDev,
          //     indentSyntax: true,
          //   },
          // },
        ],
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              importLoaders: 2,
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              implementation: sass,
              sassOptions: {
                fiber: fibers,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[hash:8].[ext]',
            },
          },
        },
      },
      {
        test: /\.(svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'media/[name].[hash:8].[ext]',
            },
          },
        },
      },

      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        loader: 'url-loader',
        options: {
          limit: 4096,
          fallback: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]',
            },
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.vue', '.json', '.wasm'],
    alias: {
      '@': path.join(__dirname, 'src'),
      '~atoms': path.join(__dirname, 'src/components/atoms'),
      '~molecules': path.join(__dirname, 'src/components/molecules'),
      '~organisms': path.join(__dirname, 'src/components/organisms'),
      // TODO: make this dev only, not necessary
      'react-dom': '@hot-loader/react-dom',
      vue$: 'vue/dist/vue.esm.js',
    },
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CaseSensitivePathsPlugin(),
    new VuetifyLoaderPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`,
        BASE_URL: '"/"',
      },
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
    new PreloadWebpackPlugin(),
    new ResourceHintWebpackPlugin(),
    // new ObsoleteWebpackPlugin({
    //   name: 'obsolete',
    // }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
      template: `<style></style><div>Your browser is not supported. <button id="obsoleteClose">&times;</button></div>`,
      async: 'obsolete',
    }),
    new WebpackNoModulePlugin({
      filePatterns: ['polyfill.**.js'],
    }),
  ],
}
