# BVReviews

One can use this component in order to add baazarvoice reviews widget to the page. The component encapsulates logic to load main baazarvoice script to the page. The component provides ability for content editors to configure BV product mapping via UI.

## Usage

You need to import the component

``` js
import { BVReviews } from '@bodiless/bv';
```

And then you can place the component on a page

``` js
<BVReviews />
```

## Customization

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
