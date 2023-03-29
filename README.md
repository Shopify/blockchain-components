# Blockchain components

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md) [![CI](https://github.com/Shopify/blockchain-components/actions/workflows/ci.yml/badge.svg)](https://github.com/Shopify/blockchain-components/actions?query=branch%3Amain) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](../../.github/contributing.md) [![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat)](https://main--639b1f308693132693d9b82c.chromatic.com/)

A loosely related set of components for blockchain functionality on Shopify storefronts.

These packages are built to help you integrate blockchain functionality on your Shopify storefront. While you are not required to use all of them at the same time, the idea is that when used together the result is a seamless Web3 experience for your customers.

## Usage

This repository is managed as a monorepo. Each package has its own `README.md` and documentation describing usage.

### Package Index

| Package                                                          | Description                                              | NPM                                                                                                                                                        |
| ---------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@shopify/blockchain-components](packages/blockchain-components) | Shared packages for blockchain components                | [![@shopify/blockchain-components](https://img.shields.io/npm/v/@shopify/blockchain-components)](https://npmjs.com/package/@shopify/blockchain-components) |
| [@shopify/connect-wallet](packages/connect-wallet)               | Crypto wallet connection library for Shopify storefronts | [![@shopify/connect-wallet](https://img.shields.io/npm/v/@shopify/connect-wallet)](https://npmjs.com/package/@shopify/connect-wallet)                      |
| [@shopify/gate-context-client](packages/gate-context-client)     | Gate unlocking context client for Shopify storefronts    | [![@shopify/gate-context-client](https://img.shields.io/npm/v/@shopify/gate-context-client)](https://npmjs.com/package/@shopify/gate-context-client)       |
| [@shopify/tokengate](packages/tokengate)                         | Tokengating component for Shopify storefronts            | [![@shopify/tokengate](https://img.shields.io/npm/v/@shopify/tokengate)](https://npmjs.com/package/@shopify/tokengate)                                     |

### Run a command

**All workspaces**

Run commands across all workspaces. This uses [`turbo run <command>`](https://turborepo.org/docs/reference/command-line-reference#turbo-run-task).

| Command                  | Description                                                                                                                                                                                                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn build`             | Builds all workspaces (`./apps`, `./examples`, `./packages`) in order of their dependencies.                                                                                                                                                                                            |
| `yarn build:packages`    | Builds all packages located in the `./packages` directory in order of their dependencies.                                                                                                                                                                                               |
| `yarn changeset`         | Adds a new [changelog entry](https://github.com/Shopify/blockchain-components/blob/main/.github/contributing.md#adding-a-changeset)                                                                                                                                                     |
| `yarn dev`               | Builds all packages located in the `./packages` directory without regard to any dependencies between the packages and rebuilds when package files are changed. Also runs the `./apps/playground` project for local development purposes. Does not generate declaration files (`.d.ts`). |
| `yarn dev:packages`      | Builds all packages located in the `./packages` directory without regard to any dependencies between the packages and rebuilds when package files are changed. Does not generate declaration files (`.d.ts`).                                                                           |
| `yarn example`           | Runs the script in `./examples/scripts` which opens a prompt asking which example you want to run. After selecting an example, the packages within `./packages` are built and the example you selected is started.                                                                      |
| `yarn example:[example]` | Starts the development server for the example you provided. <br /><br /> Options: `cra` &#124; `custom-theme` &#124; `nextjs` &#124; `remix` &#124; `vite`                                                                                                                              |
| `yarn lint`              | Runs [eslint](https://eslint.org/) against all packages in workspaces that contain a `lint` script to ensure they comply with the rules provided in our [eslint configuration](../.eslintrc.js).                                                                                        |
| `yarn typecheck`         | Builds all packages located in `./packages` directory in order of their dependencies and runs type validation.                                                                                                                                                                          |

## Want to contribute?

Check out our [Contributing Guide](./.github/contributing.md)

## Questions?

For Shopifolk, you can reach out to us in Slack in `#blockchain-components` channel. For external inquiries, we welcome bug reports, enhancements, and feature requests via GitHub [issues](/issues).

## License

MIT &copy; [Shopify](https://shopify.com/), see [LICENSE.md](LICENSE.md) for details.

<a href="https://shopify.com" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./images/shopify-light.svg">
    <source media="(prefers-color-scheme: light)" srcset="./images/shopify-dark.svg">
    <img alt="Shopify Logo" src="./images/shopify-dark.svg">
  </picture>
</a>
