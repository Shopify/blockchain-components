# Contributing

We want this community to be **friendly and respectful** to each other. Please follow our [Code of Conduct](./code_of_conduct.md) in all your interactions with the project.

## Infrastructure

This repository utilizes [Turborepo](https://turbo.build/repo/docs), a high-performance build system well-suited for monorepos. The following scripts are Turbo scripts:

| Script           | Description                                                                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn build`     | Builds all packages located in the `<rootDir>/packages` directory in order of their dependencies.                                                                                               |
| `yarn dev`       | Builds all packages located in the `<rootDir>/packages` directory without regard to any dependencies between the packages. Does not generate declaration files (`.d.ts`).                       |
| `yarn lint`      | Runs [eslint](https://eslint.org/) against all packages inside the `<rootDir>/packages` directory to ensure they comply with the rules provided in our [eslint configuration](../.eslintrc.js). |
| `yarn typecheck` | Builds all packages located in `<rootDir>/packages` directory in order of their dependencies and runs type validation.                                                                          |

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

## Semantic versioning

Blockchain-components packages follow semantic versioning. We release [patch versions for bug fixes](https://github.com/Shopify/blockchain-components/blob/.github/contributing.md#patch), [minor versions for new features](https://github.com/Shopify/blockchain-components/blob/.github/contributing.md#minor), and [major versions for breaking changes](https://github.com/Shopify/blockchain-components/blob/.github/contributing.md#major). When we make breaking changes, we introduce deprecation warnings in a minor version along with the upgrade path so that our users learn about the upcoming changes and migrate their code in advance.

The following sections detail what kinds of changes result in each of major, minor, and patch version bumps:

### Major

- Removal of a prop from a component
- Change to the type accepted for a prop
- Breaking changes to minimum version of dependencies
- Breaking changes to public Sass variables, functions and mixins

### Minor

- New prop for a component
- Additional type accepted for a prop
- Deprecation of a component, prop, public Sass variable, function, or mixin (ahead of its removal in the next major version)

### Patch

- Breaking change to the HTML generated by a component, including addition, removal, or renaming of classes
- Changes that do not impact public APIs
- Non-breaking changes to minimum version of dependencies
- Breaking changes to private Sass variables, functions, and mixins

## Branch organization

We do our best to keep `main` releasable at all times, with work for major releases happening in separate branches. [Breaking changes](https://github.com/Shopify/blockchain-components/blob/main/.github/contributing.md#major) should never be merged directly to `main`. Otherwise, if you send a pull request please do it against the `main` branch. Continue reading for more about pull requests and breaking changes.

### Changelog

The changelog is created with [Changesets](https://github.com/changesets/changesets).

#### Adding a changeset

A changeset describes changes made in a branch or commit. It holds three bits of information:

- What packages we need to release
- What version we are releasing packages
- A changelog entry for the released packages

Add a changeset if you have made any changes that will require a package version bump and release:

1. Run `yarn changeset`.
2. Select the packages you want to include using ↑ and ↓ to navigate to packages, and space to select a package. Hit enter when all desired packages are selected.
3. Select a [bump type](https://github.com/Shopify/blockchain-components/blob/main/.github/contributing.md#semantic-versioning) for each selected package.
4. Provide a message to be written into the changelog on the next release.

#### Writing a changelog message

Keep the following in mind when authoring your changelog entry (final prompt after running `yarn changeset`):

- Use a positive, conversational tone (for example, use “support” over “allow” and other authoritative verbs)
- Avoid redundancy when possible (try to phrase a bug fix entry without the word “bug”)
- Use sentence case
- Use plain language

#### Out of scope for the changelog

Generally, changes related to these topics can be omitted:

- Dev dependencies upgrades
- Chores (infrastructure, release process…)

### Contributor License Agreement (CLA)

Each contributor is required to [sign a CLA](https://cla.shopify.com/). This process is automated as part of your first pull request and is only required once. If any contributor has not signed or does not have an associated GitHub account, the CLA check will fail and the pull request is unable to be merged.
