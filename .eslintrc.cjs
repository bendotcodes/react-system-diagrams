/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  root: true,
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['src/**/*.{ts,tsx}'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint'],
    },
  ],
};
