import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    ignores: [
      'dist',
      'node_modules',
      '.vite',
      '.vscode',
    ],
  },
)
