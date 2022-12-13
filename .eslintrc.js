module.exports = {
  env: {
    node: true,
  },
  extends: [
    'plugin:@shopify/typescript',
    'plugin:@shopify/typescript-type-checking',
    'plugin:@shopify/react',
    'plugin:@shopify/jest',
    'plugin:@shopify/prettier',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  rules: {
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@shopify/jsx-no-complex-expressions': 'off',
    'no-catch-shadow': 'off',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
