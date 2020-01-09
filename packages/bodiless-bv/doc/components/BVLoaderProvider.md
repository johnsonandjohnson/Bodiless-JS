# BVLoaderProvider

One can use this component in order to add main Baazarvoice script to the page himself/herself. It might be helpful to add this component from performance and UX perspective when there are a lot of BV widgets on the same page.

## Usage

First, you need to compose your custom BV components.

``` js
import { BVRatingsSummaryBase, BVReviewsBase, asBodilessBV } from '@bodiless/bv';

const CustomBVRatingsSummary = asBodilessBV(BVRatingsSummaryBase);
const CustomBVReviews = asBodilessBV(BVReviewsBase);
```

Then, you should ensure BVLoaderProvider is imported on our page

``` js
import { BVLoaderProvider } from '@bodiless/bv';
```

Then, you can add BVLoaderProvider and our custom components on a page

```js
<BVLoaderProvider>
  <CustomBVRatingsSummary />
  <CustomBVReviews />
</BVLoaderProvider>
```
