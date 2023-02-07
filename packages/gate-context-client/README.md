# `@shopify/gate-context-client`

[![npm version](https://img.shields.io/npm/v/@shopify/gate-context-client.svg?label=@shopify/gate-context-client)](https://www.npmjs.com/package/@shopify/gate-context-client) [![CI](https://github.com/Shopify/blockchain-components/actions/workflows/ci.yml/badge.svg)](https://github.com/Shopify/blockchain-components/actions?query=branch%3Amain) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](../../.github/contributing.md)

The **gate context client** stores information needed by a Shopify function in order to operate. This context gets passed as one of the inputs to a Shopify function.

We currently only support the Online Store channel, and AJAX API Cart as a backing store.

## Get started

See the [Tokengating example app tutorial](https://shopify.dev/apps/blockchain/tokengating/build-a-tokengating-app) for more context, and specifically the end of the [Show gates on the storefront using a theme app extension](https://shopify.dev/apps/blockchain/tokengating/build-a-tokengating-app/show-gates-storefront) part about writing an HMAC.
