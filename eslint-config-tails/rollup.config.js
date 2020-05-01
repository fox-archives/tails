import json from '@rollup/plugin-json'
import cleaner from 'rollup-plugin-cleaner'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs',
    },
  ],
  plugins: [
    json(),
    terser(),
    cleaner({
      targets: ['dist'],
    }),
  ],
}
