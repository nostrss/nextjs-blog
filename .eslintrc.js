module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:@next/next/recommended',
    'plugin:prettier/recommended',
    // 'plugin:react/recommended',
    // 'plugin:import/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'import', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/no-array-index-key': 'off',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  // settings: {
  //   'import/resolver': {
  //     node: {
  //       extensions: ['.js', '.jsx', '.ts', '.tsx'],
  //       paths: ['./src'],
  //     },
  //   },
  // },
  // alias: {
  //   map: [['@', './src']],
  //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
  // },
};
