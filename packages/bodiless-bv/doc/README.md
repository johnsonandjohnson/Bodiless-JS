# Bazaarvoice Component

This component provides ability to place [Bazaarvoice](https://www.bazaarvoice.com/) Reviews into a site.

It supports [Conversations API](https://developer.bazaarvoice.com/conversations-api/home) and both [v1](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration_v1.html) and [v2](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration.html)

* [Configuration](#configuration)
* [Conversations Version 1](#bazaarvoice-version-1)
* [Conversations Version 2](#bazaarvoice-version-2)
* [HOCs](#bazaarvoice-hoc39s)
* [BV Loader Provider](#bvloaderprovider)

## Configuration

This section describes configuration steps required in order to use BV Components.

### Prerequisites

In order to use BV components, you need to know:

* URL of main Baazarvoice script. Example: `https://apps.bazaarvoice.com/deployments/<client_name>/<site_ID>/<environment>/<locale>/bv.js,` or
* client_name, site_ID, environment and locale of your Baazarvoice account.

### How to configure

In order to connect your BV components to BV service, you need to set BV_SCRIPT environment variable to main BV main script url:

``` bash
BV_SCRIPT="https://apps.bazaarvoice.com/deployments/<client_name>/<site_ID>/<environment>/<locale>/bv.js"
```

Altenatively, you can set the following environment variables

``` bash
BV_CLIENT_NAME='clientid'
BV_SITE_ID='main_site'
BV_ENVIRONMENT='staging'
BV_LOCALE='en_US'
```

By default, [Display integration V2](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration.html) is enabled.

### How to enable Display Integration V1

If you want to enable [Display Intergration V1](https://knowledge.bazaarvoice.com/wp-content/conversations/en_US/Display/display_integration_v1.html)

If you configure the connection by setting BV_SCRIPT in environment variable, then no additional settings is required, just ensure the script you set ends with bvapi.js.

If you configure the connection by setting BV_CLIENT_NAME, BV_SITE_ID, BV_ENVIRONMENT, BV_LOCALE, you need to set the following environment variable

``` bash
BV_API_VERSION=1
```

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

# BazaarVoice HOC's

## asBodilessBV

One can use this HOC in order to enhance his/her base BV component with Bodiless data handlers.

### Usage

You need to import the HOC and compose your component

``` js
import { asBodilessBV, BVRatingsSummaryBase } from '@bodiless/bv';
const MyBVComponent = asBodilessBV(BVRatingsSummaryBase);
```

Then you can add your component on a page

``` js
<MyBVComponent />
```

## asBodilessBV

One can use this HOC in order to compose his/her own BV component. asBodilessBV provides error handling and allows to subscribe to event when main BV script is loaded and $BV object is initialized.

### Usage

You need to import the HOC and compose your component

``` js
import { asBVComponent } from '@bodiless/bv';

const MyBVContainer = props => <div id="BVContainer" {...props}></div>;
const MyBVComponent = asBVComponent('BV Ratings Summary', () => $BV.ui('rr', 'show_reviews', {productId: 'product_id'}))(MyBVContainer);
)
```

Then you can add your component on a page

``` js
<MyBVComponent />
```

## asDesignableBVComponent

One can use this HOC in order to compose his/her own BV component. asDesignableBVComponent provides error handling and allows to subscribe to event when main BV script is loaded and $BV object is initialized.

### Usage

You need to import the HOC and compose your component

``` js
import { asDesignableBVComponent } from '@bodiless/bv';

const MyBVContainer = props => <div id="BVContainer" {...props}></div>;
const MyBVComponent = asDesignableBVComponent('BV Ratings Summary', () => $BV.ui('rr', 'show_reviews', {productId: 'product_id'}))(MyBVContainer);
)
```

Then you can add your component on a page

``` js
<MyBVComponent />
```

## asBodilessBV

One can use this HOC in order to enhance his/her base BV component with bodiless data handlers and product edit form.

### Usage

You need to import the HOC and compose your component

``` js
import { asEditableBV, BVRatingsSummaryBase } from '@bodiless/bv';
const MyBVComponent = asEditableBV(BVRatingsSummaryBase);
```

Then you can add your component on a page

``` js
<MyBVComponent />
```

## withBVLoader

One can use this HOC in order to enhance his/her custom BV component with loading main BV script.

### Usage

You need to import the HOC and compose your component

``` js
import { withBVLoader } from '@bodiless/bv';
const BVComponentWithLoader = withBVLoader(YourCustomBVComponent);
```

Then you can add your component on a page

``` js
<BVComponentWithLoader />
```

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
