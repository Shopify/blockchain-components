module.exports = {
  root: true,
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
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['node_modules', 'dist', 'tsup.config.ts', 'vite.config*'],
  rules: {
    '@shopify/jsx-no-complex-expressions': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
      },
    ],
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T', 'U'],
      },
    ],
    'no-catch-shadow': 'off',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'styled-components',
            importNames: [
              'createGlobalStyle',
              'ThemeContext',
              'useTheme',
              'withTheme',
            ],
            message:
              'The import specified affects external stylesheets and creates build errors for developers using styled-components.',
          },
          {
            name: 'react-i18next',
            importNames: ['useTranslation'],
            message:
              'Please use the useTranslation hook defined in the hooks directory to ensure that the translation is using the proper i18nInstance and namespace.',
          },
        ],
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
