module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'standard',
    'standard-react'
  ],
  plugins: [
    'react'
  ],
  parserOptions: {
    'sourceType': 'module'
  },
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never'
    }]
  }
}
