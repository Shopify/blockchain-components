# Blockchain components

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)

A loosely related set of components for blockchain functionality on Shopify storefronts.

These packages are built to help you integrate blockchain functionality on your Shopify storefront. While you are not required to use all of them at the same time, the idea is that when used together the result is a seamless Web3 experience for your customers.

## Usage

This repository is managed as a monorepo. Each package has its own `README.md` and documentation describing usage.

### Package Index

| Package                                                      | Description                                              |
| ------------------------------------------------------------ | -------------------------------------------------------- |
| [@shopify/connect-wallet](packages/connect-wallet)           | Crypto wallet connection library for Shopify storefronts |
| [@shopify/gate-context-client](packages/gate-context-client) | Gate unlocking context client for Shopify storefronts    |
| [@shopify/tokengate](packages/tokengate)                     | Tokengating component for Shopify storefronts            |

### Run a command

**All workspaces**

Run commands across all workspaces. This uses [`turbo run <command>`](https://turborepo.org/docs/reference/command-line-reference#turbo-run-task).

| Command          | Runs                                                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `yarn changeset` | Adds a new [changelog entry](https://github.com/Shopify/blockchain-components/blob/main/.github/contributing.md#adding-a-changeset) |

## Want to contribute?

Check out our [Contributing Guide](./.github/CONTRIBUTING.md)

## Questions?

For Shopifolk, you can reach out to us in Slack in `#blockchain-apps` channel. For external inquiries, we welcome bug reports, enhancements, and feature requests via GitHub [issues](https://github.com/Shopify/blockchain-components/issues).

## License

MIT &copy; [Shopify](https://shopify.com/), see [LICENSE.md](LICENSE.md) for details.

[<img src="images/shopify.svg" alt="Shopify" width="200" />](https://www.shopify.com/)
