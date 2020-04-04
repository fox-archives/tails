import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.js',
  inlineDynamicImports: true,
  output: {
    file: 'dist/index.js',
    format: 'esm',
  },
  plugins: [json(), terser()],
}
