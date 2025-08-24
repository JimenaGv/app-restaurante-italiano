import globals from 'globals'
import { defineConfig, globalIgnores } from 'eslint/config'
import neostandard from 'neostandard'

export default defineConfig([
  ...neostandard(),
  globalIgnores(['dist']),
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.node,
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
