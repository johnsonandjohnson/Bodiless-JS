# BazaarVoice Version 2

It supports [Conversations API](https://developer.bazaarvoice.com/conversations-api/home) and [v2](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration.html)

## BVReviews

One can use this component in order to add baazarvoice reviews widget to the page. The component encapsulates logic to load main baazarvoice script to the page. The component provides ability for content editors to configure BV product mapping via UI.

### Usage

You need to import the component

``` js
import { BVReviews } from '@bodiless/bv';
```

And then you can place the component on a page

``` js
<BVReviews />
```

### Customization

It is possible to customize the component by using Design API. The component exposes:

* BVProductIsNotMapped - component is displayed when BV External ID is not set
* BVLoading - component is displayed while BV main script is loading
* BVPlaceholder - component is displayed on edit mode

For instance, you can add some styles to the exposed components

``` js
const asBVReviewsBlue = withDesign({
  BVProductIsNotMapped: addClasses('bg-blue text-white p-2 border border-red'),
  BVPlaceholder: addClasses('bg-blue text-white p-2 border border-red'),
  BVLoading: addClasses('bg-blue text-white p-2 border border-red'),
});

const BlueBVReviews = asBVReviewsBlue(BlueBVReviews);
```

And then you can add your customized component on a page

``` js
<BlueBVReviews />
```

## BVInlineRatings

One can use this component in order to add baazarvoice inline ratings widget to the page. The component encapsulates logic to load main baazarvoice script to the page. The component provides ability for content editors to configure BV product mapping via UI.

### Usage

You need to import the component

``` js
import { BVInlineRatings } from '@bodiless/bv';
```

And then you can place the component on a page

``` js
const redirectUrl = "http://localhost/testUrl"; // set it you want to include a hyperlink in an inline rating
const seo = false; // set it if you want to enable/disable rendering of schema.org metadata
<BVInlineRatings redirectUrl={redirectUrl} seo={seo} />
```

### Customization

It is possible to customize the component by using Design API. The component exposes:

* BVProductIsNotMapped - component is displayed when BV External ID is not set
* BVLoading - component is displayed while BV main script is loading
* BVPlaceholder - component is displayed on edit mode

For instance, you can add some styles to the exposed components

``` js
const asBVInlineRatingsBlue = withDesign({
  BVProductIsNotMapped: addClasses('bg-blue text-white p-2 border border-red'),
  BVPlaceholder: addClasses('bg-blue text-white p-2 border border-red'),
  BVLoading: addClasses('bg-blue text-white p-2 border border-red'),
});

const BlueBVInlineRatings = asBVInlineRatingsBlue(BVInlineRatings);
```

And then you can add your customized component on a page

``` js
<BlueBVInlineRatings />
```

## BVRatingsSummary

One can use this component in order to add baazarvoice ratings summary widget to the page. The component encapsulates logic to load main baazarvoice script to the page. The component provides ability for content editors to configure BV product mapping via UI.

### Usage

You need to import the component

``` js
import { BVRatingsSummary } from '@bodiless/bv';
```

And then you can place the component on a page

``` js
<BVRatingsSummary />
```

### Customization

It is possible to customize the component by using Design API. The component exposes:

* BVProductIsNotMapped - component is displayed when BV External ID is not set
* BVLoading - component is displayed while BV main script is loading
* BVPlaceholder - component is displayed on edit mode

For instance, you can add some styles to the exposed components

``` js
const asBVRatingsSummaryBlue = withDesign({
  BVProductIsNotMapped: addClasses('bg-blue text-white p-2 border border-red'),
  BVPlaceholder: addClasses('bg-blue text-white p-2 border border-red'),
  BVLoading: addClasses('bg-blue text-white p-2 border border-red'),
});

const BlueBVRatingsSummary = asBVRatingsSummaryBlue(BVRatingsSummary);
```

And then you can add your customized component on a page

``` js
<BlueBVRatingsSummary />
```

## BVReviewsBase

One can use this component as base component in order to compose his/her custom BV component for rendering BV Reviews widget.

### Usage

You need to import the base component and the list of HOCs to compose your custom BV component

``` js
import { BVReviewsBase, withBVLoader, asBodilessBV } from '@bodiless/bv';
import { flowRight } from 'lodash';
```

Then you need to compose the custom component

``` js
const CustomBVComponent = flowRight(
  withBVLoader,
  asBodilessBV
)(BVReviewsBase);
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
import { BVInlineRatingsBase, withBVLoader, asBodilessBV } from '@bodiless/bv';
import { flowRight } from 'lodash';
```

Then you need to compose the custom component

``` js
const CustomBVComponent = flowRight(
  withBVLoader,
  asBodilessBV
)(BVInlineRatingsBase);
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
import { BVRatingsSummaryBase, withBVLoader, asBodilessBV } from '@bodiless/bv';
import { flowRight } from 'lodash';
```

Then you need to compose the custom component

``` js
const CustomBVComponent = flowRight(
  withBVLoader,
  asBodilessBV
)(BVRatingsSummaryBase);
```

Then you can place the custom component on a page

``` js
<CustomBVComponent />
```
