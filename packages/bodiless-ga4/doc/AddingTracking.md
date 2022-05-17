## Using GTM G4 Data Attributes & Datalayer for Site Builder

Please refer to the [Analytics G4 specs](https://github.com/searchdiscovery/client-jnj-ga4-dl-spec) or the Analytics team directly to confirm tracking requirements.

### Data Attributes

The simplest way for components to track is add the appropriately defined data layer attribute to the specific component.  This can be done in component or via addProps or [addPropsIf](../../bodiless/Development/Architecture/FClasses?id=conditional-tokens)

?> **TIP** This works well for static data.

  ```
  addProps({ data-layer-menu_item: 'Home' })
  ```

or

  ```
  <Component data-layer-menu_item={titleNode.data.text} {...props} />;
  ```

### Data Layer

Site builders may add events and other information to that data layer by pushing to one of two locations:

1. Directly to the dataLayer (Preferred method)
1. Add Script in head that pushes the event to Helmet

?> **TIP** This is often done, when there is user interaction with the component.

#### Pushing directly to DataLayer

We provide some functions to facilitate:

* pushDataAnalytics to push your data directly to the dataLayer.  ** Recommended to use and only push to dataLayer.

  ```
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

#### Utilizing Helmet

  1. Define the data layer object

  ```
  const productDefaultDataLayer = {
    // Name of the Data Layer
    dataLayerName: 'dataLayer',
    // Data object -- this example sets of event and ecommerce object to push specific data.
    dataLayerData: {
      productObject: {
        event: 'view_item',
        ecommerce: null,
      },
    },
    /* 
     * Data Type is used for the clear null event that is sent just prior to push of the actual event.
     * This should almost always be identical to the name of the wrapper. 
     */
    dataLayerType: 'ecommerce',
  };
  ```

  // Define a product Name editable field to be added to the GTM form.
  const withDataLayerProductName = withDataLayerItem({
    name: 'productName',
    label: 'Product Name',
    path: 'productObject.product.0.productInfo.productName',
  });

  ```

  1. Compose a token that can be added to the relevant page/template

  ```

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

  1. In your page/template, add to the GtmComponent

  ```

  const Base = asProductDetailToken({
  ...cxGenericTemplate.Default,
  Components: {
    ...cxGenericTemplate.Default.Components,
    GA4Helmet: replaceWith(GA4DataLayerProductItemHelmet),
  },

  ```
