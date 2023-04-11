---
'@shopify/tokengate': patch
---

In this release, we added a "No Segment" display element to the Tokengate component which will be displayed under the following conditions (both must be met):
- No conditions are provided in the requirements parameter, for example: `requirements={{conditions: [], logic: 'ANY'}}`
- The component is not loading conditions, for example: `isLoading={false}`.
