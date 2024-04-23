import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    splitting: false,
    sourcemap: true,
    dts: true,
    clean: true,
    format: ['esm', 'cjs']
  },
  {
    entry: ['src/cli.ts'],
    splitting: false,
    sourcemap: false,
    clean: true,
    dts: false,
    format: ['esm']
  }
])
