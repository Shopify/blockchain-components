module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:@shopify/typescript',
    'plugin:@shopify/typescript-type-checking',
    'plugin:@shopify/react',
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
    'import/order': [
      'error',
      {
        alphabetize: {
          // Sort imports alphabetically in scending order.
          order: 'asc',
          // Ignore case when sorting imports.
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: 'shared',
            group: 'external',
          },
        ],
        /**
         * import fs from 'fs';
         *
         * import package from 'npm-package';
         *
         * import xyz from '~/project-file';
         *
         * import index from '../';
         *
         * import sibling from './foo';
         */
        groups: ['builtin', 'external', 'parent', 'sibling', 'internal',],
        'newlines-between': 'always',
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
            name: 'react-i18next',
            importNames: ['useTranslation'],
            message:
              'Please use the useTranslation hook defined in the hooks directory to ensure that the translation is using the proper i18nInstance and namespace.',
          },
        ],
      },
    ],
  },
  settings: {
    'import/internal-regex': 'shared',
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
