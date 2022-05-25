# Using GTM GA4 Data Attributes & Data Layer

?> **Note:** This documentation is intended for Site Builders.

Please refer to the [Analytics GA4 Spec](https://github.com/searchdiscovery/client-jnj-ga4-dl-spec),
or the Analytics team directly, to confirm tracking requirements.

## Data Attributes

The simplest way for components to be tracked is to add the appropriately defined data layer
attribute to the specific component. This can be done in the component, or via `addProps` or
[`addPropsIf`](/Development/Architecture/FClasses?id=conditional-tokens).

?> **Tip:** This works well for static data.

```js
addProps({ data-layer-menu_item: 'Home' })
```

or

```jsx
<Component data-layer-menu_item={titleNode.data.text} {...props} />;
```

## Data Layer

Site Builders may add events and other information to that data layer by pushing to one of two
locations:

01. Directly to the data layer. (Preferred method)
01. Add script in the document head that pushes the event to the Helmet.

?> **Tip:** This is often done when there is user interaction with the component.

### Pushing Directly to Data Layer

We provide some functions to facilitate:

- `pushDataAnalytics` to push your data directly to the data layer. (Recommended to use, and only
  push to the data layer.)

  ```ts
  type SearchAnalyticsTypes = {
    corrected_term: string,
    search_term: string,
    search_type?: string,
  };

  export const pushSearchAnalytics = (props: SearchAnalyticsTypes) => {
    const data = {
      event: 'search',
      search_type: 'site',
      corrected_term: props.corrected_term,
      search_term: props.search_term,
    };

    pushDataAnalytics(data);
  };
  ```

### Utilizing Helmet

01. Define the data layer object.

    ```js
    const productDefaultDataLayer = {
      // Name of the Data Layer
      dataLayerName: 'dataLayer',
      /**
       * Data object -- this example sets the event
       * and ecommerce object to push specific data.
       */
      dataLayerData: {
        productObject: {
          event: 'view_item',
          ecommerce: null,
        },
      },
      /**
       * Data Type is used for the clear null event that is sent just prior to
       * the push of the actual event.
       * This should almost always be identical to the name of the wrapper.
       */
      dataLayerType: 'ecommerce',
    };

    // Define a product Name editable field to be added to the GTM form.
    const withDataLayerProductName = withDataLayerItem({
      name: 'productName',
      label: 'Product Name',
      path: 'productObject.product.0.productInfo.productName',
    });
    ```

01. Compose a token that can be added to the relevant page/template.

    ```js
    export const GA4DataLayerProductItemHelmet = withGlobalGA4Form(
      withDefaultDataLayer(productDefaultDataLayer),
      withDataLayerProductID('product-id'),
      withDataLayerSku('product-sku'),
      withDataLayerUPC('product-upc'),
      withDataLayerProductName('product-name'),
      withDataLayerCategory('product-category'),
      withDataLayerProductVariant('product-variant'),
    )(Helmet);
    ```

01. In your page/template, add to the `GtmComponent`.

    ```js
    const Base = asProductDetailToken({
      ...cxGenericTemplate.Default,
      Components: {
        ...cxGenericTemplate.Default.Components,
        GA4Helmet: replaceWith(GA4DataLayerProductItemHelmet),
      },
      // ...
    });
    ```
