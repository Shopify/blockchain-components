# `@shopify/gate-context-client`

[![npm version](https://img.shields.io/npm/v/@shopify/gate-context-client.svg?label=@shopify/gate-context-client)](https://www.npmjs.com/package/@shopify/gate-context-client) [![CI](https://github.com/Shopify/blockchain-components/actions/workflows/ci.yml/badge.svg)](https://github.com/Shopify/blockchain-components/actions?query=branch%3Amain) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](../../.github/contributing.md)

The `gate-context-client` package provides an abstract interface to read and write gate context information. The client writes gate context information for use by [Shopify functions](/docs/api/functions). For example, the client could write a signed message to the context. That message could be validated and processed by a Shopify function in order to apply discounts or block checkout.

## Code example

```typescript
interface Input {
  walletAddress: string;
  walletVerificationMessage?: string;
  walletVerificationSignature?: string;
}

const client = getGateContextClient(
  backingStore: 'ajaxApi',
);

async function run(data: Input) {
  try {
    await client.write(data)
  } catch(error) {
    console.error('Error writing to GateContext', error);
  }
}
```

## Installation

```bash
yarn add @shopify/gate-context-client
```

## Get started

See the [Tokengating example app tutorial](https://shopify.dev/apps/blockchain/tokengating/build-a-tokengating-app) for more context, and specifically the end of the [Show gates on the storefront using a theme app extension](https://shopify.dev/apps/blockchain/tokengating/build-a-tokengating-app/show-gates-storefront) part about writing an HMAC.

## Backends

The client is intended to abstract backend details and automatically choose the correct backend where possible. For
example, for the Online store channel, the Cart Ajax API will be used. The [Cart Ajax API](https://shopify.dev/docs/api/ajax/reference/cart) is the only supported backend right now.

### Cart Ajax API

For the Cart Ajax API, the data will be written to a special cart attribute called `_shopify_gate_context` as a JSON string. The client implementation for this backend will automatically serialize and deserialize the value as needed.

After writing via the client and inspecting the cart, via `/cart.js`, you'd see something like the following:

```json
{
  "token": "111f",
  "attributes": {
    "_shopify_gate_context": "{\"attribute1\": 123}"
  },
  ...
}
```

## `shopifyGateContextGenerator`

This is an async transformation function that will get called before the write to the
backend occurs, and may be used to override the written value.

```typescript
interface Input {
  walletAddress: string;
  walletVerificationMessage?: string;
  walletVerificationSignature?: string;
}

const client = getGateContextClient({
  backingStore: 'ajaxApi',
  // adds an additional key before writing
  shopifyGateContextGenerator: (data: Input) => {
    const {walletAddress} = data;
    // async call using walletAddress
    return Promise.resolve({...data, extraKey: ''});
  },
});

async function run(data: Input) {
  try {
    await client.write(data);
  } catch (error) {
    console.error('Error writing to GateContext', error);
  }
}
```
