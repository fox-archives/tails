import path from 'path'

export const protoLoaderOptions = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
}

export const $ = path.join(__dirname, '../../')
