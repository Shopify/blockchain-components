---
'@shopify/tokengate': patch
---

Adds formatting to the discount value. If the discount is type `fixedAmount`, we format to two decimal places. If the discount is type `percentage`, we remove any decimals.

Adds support for `string` values to the reaction type discounts.
