module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
    "jest/globals": true
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],
  ignorePatterns: ['.eslintrc.cjs'],
  parserOptions: {
    project: `${__dirname}/tsconfig.json`,
  },
  plugins: ["jest"],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/indent': 'off',
    'import/extensions': "off",
    '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variable',
            format: ['PascalCase', 'camelCase', 'UPPER_CASE', 'snake_case'], 
          },
        ],
  },
}

