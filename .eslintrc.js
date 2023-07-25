module.exports = {
  extends: ['next', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'space-before-function-paren': 'off',
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    'prefer-const': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@next/next/no-img-element': 'off',
    'jsx-a11y/alt-text': 'off',
    'prettier/prettier': 'error'
  }
}
