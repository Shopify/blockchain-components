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

While developing, you can utilize the [playground](../apps/playground/) to test your changes. The gate validation criteria in this app is only a sample. To see the changes in the `playground` project, open your terminal and run the following command:

```sh
yarn dev
```

You should then see output similar to the following. The links provided in the terminal can be used for testing your changes locally.

```sh
playground:dev:   VITE v3.2.5  ready in 459 ms
playground:dev:
playground:dev:   ➜  Local:   http://localhost:5173/
playground:dev:   ➜  Network: http://127.0.2.2:5173/
```

Remember to add tests for your change if possible. Run the unit tests by running the following:

```sh
yarn test
```

If you would prefer to run the tests as your test files change, you can run the following:

```sh
yarn test:watch
```

### Testing on mobile device

To test the changes on a mobile device, we recommend the use of [ngrok](https://ngrok.com/)

1.  Run `yarn dev`
2.  Run `ngrok http 5173`

You will then see a URL in your terminal window with a URL for you to open on your mobile device. You can use this for testing your changes.

### Testing in a consuming project

The `/snapit` GitHub comment command in pull requests will publish a snapshot NPM package for testing.

## Documentation

Documentation for the package current resides on [shopify.dev](https://shopify.dev/). While this is an open-source package we are dedicated to maintaining up-to-date and relevant documentation for all packages within the repository.

## Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) and [@shopify/eslint-plugin](https://www.npmjs.com/package/@shopify/eslint-plugin) for linting and formatting the code, and [Vitest](https://vitest.dev/) for testing.

## Submitting pull requests

When submitting a pull request, please utilize the [pull request template](./pull_request_template.md) and detail the context of the changes, identify any issues that the pull request may resolve, and provide a demonstration of the changes you are making. This will help reviewers to better understand the context of your PR and provide valuable insights.

When you're sending a pull request, please abide by the following:

- Keep pull requests concise.
- Follow the pull request template when opening a pull request.
- If your PR is a new feature and not a bug fix, consider opening an issue describing your idea. This ensures you get feedback from the maintainers and don't write code that might not be used.

### Testing pull requests

You can leverage `/snapit` to generate snapshot versions of packages. The command will detect the changes in the PR and build the appropriate packages for you to install in your test project.

A possible approach would be to utilize [CodeSandbox](https://codesandbox.io) to implement the snapshot package version.

- For the `connect-wallet` package you can fork this [CodeSandbox Template](https://codesandbox.io/p/sandbox/shopify-connect-wallet-pr-template-fxj3fg) which is set up to use Vite with React and has the package set up and ready to use.

![SCR-20230216-e6e](https://user-images.githubusercontent.com/4250423/219425072-f860af9d-d195-4515-b62f-59d6fbaa4df7.png)

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

### Task List Checker

The Task List Checker counts how many tasks `- [ ]` have been checked off `- [x]`. If any are unchecked, including in nested tasks, it will mark the PR as 🟡 pending and block merge.

**Tasks in the *PR description* count toward the total. Tasks in *PR comments* do not**. Move tasks into the description if they're important; this will also make it easier for humans to find them and check them off.

Any edits to the description will trigger a recalculation, whether that's checking or unchecking boxes with a mouse, adding or removing an x in edit mode, or even adding or removing whole checkboxes.

#### Excluding tasks

If a checkbox is irrelevant for a specific PR, it can be excluded by

1. Striking it out and marking it `N/A`
    - [ ] ~~task that is not relevant to this PR~~ N/A
1. marking it **POST-MERGE**:
    - [ ] **POST-MERGE:** task that will be completed after merging
1. putting it inside a code block so it's not evaluated as markdown

    ```- [ ] task that's quoted from some other checklist```

#### Custom tasks

You are able to add any custom tasks that you would like to your PR by adding additional checkboxes to the PR description. For example, you could add the following:

**Test flow:**
- [ ] Tested the flow of wallet connection across multiple chains

### Contributor License Agreement (CLA)

Each contributor is required to [sign a CLA](https://cla.shopify.com/). This process is automated as part of your first pull request and is only required once. If any contributor has not signed or does not have an associated GitHub account, the CLA check will fail and the pull request is unable to be merged.
