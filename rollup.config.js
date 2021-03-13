import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import strip from '@rollup/plugin-strip'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import inject from '@rollup/plugin-inject'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'

import pkg from './package.json'
const input = 'src/index.ts'

const extensions = ['.js', '.ts', '.jsx', '.tsx']

const packageName = pkg.name
  .replace('@', '')
  .replace('/', '-')
  .split('-')
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join('')
export default [
  {
    input,
    output: {
      file: pkg.browser,
      format: 'umd',
      name: packageName,
      globals: {},
      sourcemap: true,
    },
    plugins: [
      resolve({
        browser: true,
      }),

      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
      }),
      babel({
        babelHelpers: 'runtime',
        exclude: [/\/node_modules\//],
        extensions,
      }),
      inject({
        Promise: ['es6-promise', 'Promise'],
      }),

      strip(),
      terser(),
      filesize(),
    ],
  },
  {
    input,
    output: [
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'auto',
      },
    ],
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      resolve({ extensions }),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        exclude: [/\/node_modules\//],
        extensions,
      }),
      filesize(),
    ],
    external: (id) => {
      return /axios|@hook\/|core-js|@babel\/runtime/.test(id)
    },
  },
]
