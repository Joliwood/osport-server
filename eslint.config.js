import { defineConfig } from 'eslint-define-config';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/indent': 'off',
      'import/extensions': 'off',
      quotes: ['error', 'single'],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['PascalCase', 'camelCase', 'UPPER_CASE', 'snake_case'],
        },
      ],
      'no-underscore-dangle': ['error', { allow: ['_avg', '_count'] }],
    },
  },
  {
    files: ['*.js', '*.jsx', '*.cjs', '*.mjs'],
    rules: {
      quotes: ['error', 'single'],
    },
  },
]);
