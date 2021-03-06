module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single'],
    'quote-props': ['error', 'consistent'],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'semi': ['error', 'never'],
    'space-before-function-paren': [
      'error', { 'anonymous': 'always', 'named': 'never' },
    ],
    'generator-star-spacing': ['error', 'after'],
  },
}
