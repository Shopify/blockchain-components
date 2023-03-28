---
'@shopify/connect-wallet': patch
'@shopify/tokengate': patch
---

Update Tailwind config to use pixels instead of REMs. We noticed that if the components were included in an application that has smaller or larger root font-size, the styling broke. We made the decision to use pixels instead.
