module.exports =
{
  root: true,
  env:
  {
    es6: true,
    node: true
  },
  plugins:
  [
    '@typescript-eslint',
    'import'
  ],
  extends:
  [
    'eslint:recommended',
    'google',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  settings:
  {
    'import/resolver':
    {
      typescript: true,
      node: true
    }
  },
  ignorePatterns:
  [
    '**/build/**/*',
    '**/dist/**/*'
  ],
  rules:
  {
    '@typescript-eslint/no-unused-vars': [ 'error', { 'varsIgnorePattern': '_' } ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'arrow-parens': [ 'error', 'as-needed' ],
    'brace-style': [ 'error', 'allman' ],
    'comma-dangle': [ 'error', 'never' ],
    'import/no-unresolved': 'off',
    'indent': [ 'error', 2 ],
    'max-len': 'off',
    'new-cap': [ 'error', { 'capIsNew': false } ],
    'object-curly-spacing': [ 'error', 'always' ],
    'operator-linebreak': 'off',
    'quotes': [ 'error', 'single' ],
    'require-jsdoc': 'off'
  }
};
