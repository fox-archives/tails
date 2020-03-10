import path from 'path'

export const protoLoaderOptions = {
  keepCase: false,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}

export const $ = path.join(__dirname, '../../')
