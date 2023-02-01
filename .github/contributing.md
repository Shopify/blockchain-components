# Contributing

We want this community to be **friendly and respectful** to each other. Please follow our [Code of Conduct](./code_of_conduct.md) in all your interactions with the project.

## Infrastructure

This repository utilizes [Turborepo](https://turbo.build/repo/docs), a high-performance build system well-suited for monorepos. The following scripts are Turbo scripts:

| Script | Description |
| - | - |
| `yarn build` | Builds all packages located in the `<rootDir>/packages` directory in order of their dependencies. |
| `yarn dev` | Builds all packages located in the `<rootDir>/packages` directory without regard to any dependencies between the packages. Does not generate declaration files (`.d.ts`). |
| `yarn lint` | Runs [eslint](https://eslint.org/) against all packages inside the `<rootDir>/packages` directory to ensure they comply with the rules provided in our [eslint configuration](../.eslintrc.js). |
| `yarn typecheck` | Builds all packages located in `<rootDir>/packages` directory in order of their dependencies and runs type validation. |

## Development workflow

To get started with the project, run `yarn install` in the root directory to install the required dependencies for the packages within the repository.

```sh
yarn install
```

> This project uses [`yarn`](https://classic.yarnpkg.com/) as a package manager. While it's possible to run individual commands with [`npm`](https://github.com/npm/cli), please refrain from using it, especially `npm install.`

While developing, you can utilize the [react-tokengating-app](../packages/react-tokengating-app/) to test your changes. The gate validation criteria in this app is only a sample. To see the changes in the `react-tokengating-app` project, open your terminal and run the following command:

```sh
yarn dev
```

You should then see output similar to the following. The links provided in the terminal can be used for testing your changes locally.

```sh
@shopify/react-tokengating-app:dev:   VITE v3.2.5  ready in 459 ms
@shopify/react-tokengating-app:dev:
@shopify/react-tokengating-app:dev:   ➜  Local:   http://localhost:5173/
@shopify/react-tokengating-app:dev:   ➜  Network: http://127.0.2.2:5173/
```

Remember to add tests for your change if possible. Run the unit tests by running the following:

```sh
yarn test
```

If you would prefer to run the tests as your test files change, you can run the following:
```sh
yarn test --watch
```

## Documentation

Documentation for the package current resides on [shopify.dev](https://shopify.dev/). While this is an open-source package we are dedicated to maintaining up-to-date and relevant documentation for all packages within the repository.

## Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) and [@shopify/eslint-plugin](https://www.npmjs.com/package/@shopify/eslint-plugin) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

## Submitting pull requests

When submitting a pull request, please utilize the [pull request template](./pull_request_template.md) and detail the context of the changes, identify any issues that the pull request may resolve, and provide a demonstration of the changes you are making. This will help reviewers to better understand the context of your PR and provide valuable insights.

When you're sending a pull request, please abide by the following:

- Keep pull requests concise.
- Follow the pull request template when opening a pull request.
- If your PR is a new feature and not a bug fix, consider opening an issue describing your idea. This ensures you get feedback from the maintainers and don't write code that might not be used.

## Releasing a new version

Releases **are done by Shopify engineers**.
