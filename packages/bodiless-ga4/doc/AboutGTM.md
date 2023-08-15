# Analytics with Google Tag Manager (GTM) and Google Analytics 4 (GA4)

Sites can use a digital data layer, along with Google Tag Manager, to ensure accurate and
comprehensive analytics tracking. The data layer (`globalDataLayer`) is a global JavaScript array
object. In order to start analytics tracking using Google Tag Manager, you must configure it with
the correct GTM ID.

This package (`@bodiless/ga4`) utilizes the data layer requirements as defined in the [Johnson and
Johnson GA4 Data Layer and Data Attribute
Spec](https://github.com/searchdiscovery/client-jnj-ga4-dl-spec ':target=_blank'), and is based on
the GA4 data layer.

A site built using the Vital Design System has some default events running if the corresponding
Vital Component is utilized:

- All designable components automatically render `data-layer-region` with the component name and
  element for identification/tracking purposes.
- All pages render a
  [`PageView`](https://github.com/searchdiscovery/client-jnj-ga4-dl-spec/blob/master/events/page_view.md
  ':target=_blank') event.
- Product pages  render a `view_item` event with data that can be set by a Content Editor.
- Product Listing pages (utilizing `@vital-templates/ProductListing`) render a set of
  [`list`](https://github.com/searchdiscovery/client-jnj-ga4-dl-spec/blob/master/events/lists/view_item_list.md
  ':target=_blank') events based on user interaction with the filter.
- Search pages (utilizing `@vital-search`) render
  [`search`](https://github.com/searchdiscovery/client-jnj-ga4-dl-spec/blob/master/events/search/search.md
  ':target=_blank') or
  [`view_search_results`](https://github.com/searchdiscovery/client-jnj-ga4-dl-spec/blob/master/events/search/view_search_results.md
  ':target=_blank') events.
