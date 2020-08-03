# BazaarVoice Version 1

It supports [Conversations API](https://developer.bazaarvoice.com/conversations-api/home) and [v1](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration_v1.html)

## BVReviews

One can use this component in order to add baazarvoice reviews widget to the page. The component encapsulates logic to load main baazarvoice script to the page. The component provides ability for content editors to configure BV product mapping via UI.

### Usage

You need to import the component

``` js
import { BVReviewsV1 } from '@bodiless/bv';
```

And then you can place the component on a page

``` js
<BVReviewsV1 />
```

### BVInlineRatings

One can use this component in order to add baazarvoice inline ratings widget to the page. The component encapsulates logic to load main baazarvoice script to the page. The component provides ability for content editors to configure BV product mapping via UI.

### Usage

You need to import the component

``` js
import { BVInlineRatingsV1 } from '@bodiless/bv';
```

And then you can place the component on a page

``` js
<BVInlineRatingsV1 />
```

## BVRatingsSummary

One can use this component in order to add baazarvoice ratings summary widget to the page. The component encapsulates logic to load main baazarvoice script to the page. The component provides ability for content editors to configure BV product mapping via UI.

### Usage

You need to import the component

``` js
import { BVRatingsSummaryV1 } from '@bodiless/bv';
```

And then you can place the component on a page

``` js
<BVRatingsSummaryV1 />
```

## BVInlineRatingsBase

One can use this component as base component in order to compose his/her custom BV component for rendering BV Inline Ratings widget.

### Usage

You need to import the base component and the list of HOCs to compose your custom BV component

``` js
import { BVInlineRatingsBaseV1, withBVLoader, asBodilessBV } from '@bodiless/bv';
import { flowRight } from 'lodash';
```

Then you need to compose the custom component

``` js
const CustomBVComponent = flowRight(
  withBVLoader,
  asBodilessBV
)(BVInlineRatingsBaseV1);
```

Then you can place the custom component on a page

``` js
<CustomBVComponent />
```


## BVReviewsBase

One can use this component as base component in order to compose his/her custom BV component for rendering BV Reviews widget.

### Usage

You need to import the base component and the list of HOCs to compose your custom BV component

``` js
import { BVReviewsBaseV1, withBVLoader, asBodilessBV } from '@bodiless/bv';
import { flowRight } from 'lodash';
```

Then you need to compose the custom component

``` js
const CustomBVComponent = flowRight(
  withBVLoader,
  asBodilessBV
)(BVReviewsBaseV1);
```

Then you can place the custom component on a page

``` js
<CustomBVComponent />
```

## BVInlineRatingsBase

One can use this component as base component in order to compose his/her custom BV component for rendering BV Inline Ratings widget.

### Usage

You need to import the base component and the list of HOCs to compose your custom BV component

``` js
import { BVInlineRatingsBaseV1, withBVLoader, asBodilessBV } from '@bodiless/bv';
import { flowRight } from 'lodash';
```

Then you need to compose the custom component

``` js
const CustomBVComponent = flowRight(
  withBVLoader,
  asBodilessBV
)(BVInlineRatingsBaseV1);
```

Then you can place the custom component on a page

``` js
<CustomBVComponent />
```

## BVRatingsSummaryBase

One can use this component as base component in order to compose his/her custom BV component for rendering BV Ratings Summary widget.

### Usage

You need to import the base component and the list of HOCs to compose your custom BV component

``` js
import { BVRatingsSummaryBaseV1, withBVLoader, asBodilessBV } from '@bodiless/bv';
import { flowRight } from 'lodash';
```

Then you need to compose the custom component

``` js
const CustomBVComponent = flowRight(
  withBVLoader,
  asBodilessBV
)(BVRatingsSummaryBaseV1);
```

Then you can place the custom component on a page

``` js
<CustomBVComponent />
```
