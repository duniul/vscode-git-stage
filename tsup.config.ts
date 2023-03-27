import { defineConfig } from 'tsup'

export default defineConfig({
    format: ['cjs'],
    entry: ['src/extension.ts'],
    tsconfig: 'tsconfig.json',
    target: 'node16',
    external: ['vscode'],
    splitting: true,
    sourcemap: true,
    clean: true,
    dts: false,
})
