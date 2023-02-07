# Blockchain components

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md) [![CI](https://github.com/Shopify/blockchain-components/actions/workflows/ci.yml/badge.svg)](https://github.com/Shopify/blockchain-components/actions?query=branch%3Amain) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](../../.github/contributing.md)

A loosely related set of components for blockchain functionality on Shopify storefronts.

These packages are built to help you integrate blockchain functionality on your Shopify storefront. While you are not required to use all of them at the same time, the idea is that when used together the result is a seamless Web3 experience for your customers.

## Usage

This repository is managed as a monorepo. Each package has its own `README.md` and documentation describing usage.

### Package Index

| Package                                                      | Description                                              | NPM                                                                                                                                                  |
| ------------------------------------------------------------ | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@shopify/connect-wallet](packages/connect-wallet)           | Crypto wallet connection library for Shopify storefronts | [![@shopify/connect-wallet](https://img.shields.io/npm/v/@shopify/connect-wallet)](https://npmjs.com/package/@shopify/connect-wallet)                |
| [@shopify/gate-context-client](packages/gate-context-client) | Gate unlocking context client for Shopify storefronts    | [![@shopify/gate-context-client](https://img.shields.io/npm/v/@shopify/gate-context-client)](https://npmjs.com/package/@shopify/gate-context-client) |
| [@shopify/tokengate](packages/tokengate)                     | Tokengating component for Shopify storefronts            | [![@shopify/tokengate](https://img.shields.io/npm/v/@shopify/tokengate)](https://npmjs.com/package/@shopify/tokengate)                               |

### Run a command

**All workspaces**

Run commands across all workspaces. This uses [`turbo run <command>`](https://turborepo.org/docs/reference/command-line-reference#turbo-run-task).

| Command          | Runs                                                                                                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yarn build`     | Builds all packages located in the `<rootDir>/packages` directory in order of their dependencies.                                                                                               |
| `yarn changeset` | Adds a new [changelog entry](https://github.com/Shopify/blockchain-components/blob/main/.github/contributing.md#adding-a-changeset)                                                             |
| `yarn dev`       | Builds all packages located in the `<rootDir>/packages` directory without regard to any dependencies between the packages. Does not generate declaration files (`.d.ts`).                       |
| `yarn lint`      | Runs [eslint](https://eslint.org/) against all packages inside the `<rootDir>/packages` directory to ensure they comply with the rules provided in our [eslint configuration](../.eslintrc.js). |
| `yarn typecheck` | Builds all packages located in `<rootDir>/packages` directory in order of their dependencies and runs type validation.                                                                          |

## Want to contribute?

Check out our [Contributing Guide](./.github/CONTRIBUTING.md)

## Questions?

For Shopifolk, you can reach out to us in Slack in `#blockchain-apps` channel. For external inquiries, we welcome bug reports, enhancements, and feature requests via GitHub [issues](/issues).

## License

MIT &copy; [Shopify](https://shopify.com/), see [LICENSE.md](LICENSE.md) for details.

[<img src="images/shopify.svg" alt="Shopify" width="200" />](https://www.shopify.com/)
