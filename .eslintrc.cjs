module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Add your custom rules here
    'react/react-in-jsx-scope': 'off', // for React 17+
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-unused-expressions': ['warn'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
