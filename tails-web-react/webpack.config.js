import path from 'path'

const isDev = process.env.NODE_ENV === 'development'

export default {
  mode: isDev ? 'development' : 'production',

  devServer: {},
}
