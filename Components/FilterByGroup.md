# Filter By Group Component

The Filter By Group Component allows a selection of site content to be refined, enabling your users
to view targeted content.

The filter settings can be configured to be selectable by your users, or they can be pre-selected by
the Content Editor to curate specific content for your users.  
For configuration instructions, see: [Configure a Preset Filter](#configure-a-preset-filter).

The criteria in the Filter By Group Component are organized into _Categories_ and _Groups_. As this
component's name implies, the values by which the content is filtered are the Groups. Related Groups
are organized into Categories. It's worth noting that Groups cannot be freestanding — they must be a
member of a Category.

While BodilessJS uses the term "Group," you may think of them as "Tags," if that nomenclature is
more familiar to you.

The Filter By Group Component can be configured to allow for your users to select a single Group
from each Category (to refine their search), or multiple. With single-select, Groups will be
displayed as radio buttons, along with an "Any" option for each Category, which will enable
filtering for _any_ Group in the respective Category. With multi-select, Groups will be displayed as
checkboxes, permitting your users to specify any selection of Groups they so choose.  
For configuration instructions, see: [Site Builder Details](#site-builder-details).

| Single-Select (Radio Buttons) | Multi-Select (Checkboxes) |
|:-----------------------------:|:-------------------------:|
| ![Filter By Group Component with Radio Buttons](./assets/FilterByGroupRadioButtons.jpg ':size=300') | ![Filter By Group Component with Checkboxes](./assets/FilterByGroupCheckboxes.jpg ':size=300')

Filter By Group Components on separate pages can be configured to use the same sitewide data source,
essentially, linking the filters. By doing this, the Categories and Groups listed in these
components will be shared between the linked filters on their respective pages.

## Content Editor Details

If a Site Builder has added a Filter By Group Component to a page of your site, you can customize
the Groups listed in the component, as well as how they're categorized, using the context menu.

![Filter By Group Context Menu](./assets/FilterByGroupContextMenu.jpg ':size=50%')

?> **Note:** If you're editing where you would benefit from having full access to a Filter By Group
Component (e.g., manipulating Groups, adding new Products, etc.), you should use your site's primary
listing page (e.g., `/products/`), where there is no [Preset Filter](#configure-a-preset-filter)
configured; this will allow you to see all the items in the filter, as well as edit the Groups as
needed.

### Add a Category

To add a Category to a Filter By Group Component:

01. While in [Edit Mode](/ContentEditorUserGuide/#edit-mode), select the Category (or a Group within
    it) that is directly above where you would like to list a new Category, and, within its context
    menu, under "Category," click **Add**.  
    ![Category Context Menu](./assets/CategoryContextMenu.jpg ':size=200')
    - If you are adding the _first_ Category to the Filter By Group Component, there should already
      be an unnamed Category item (with the placeholder text "Category Name") present in the
      otherwise empty Filter body; skip to Step 3.
    - If you intend to add multiple Categories, you may click **Add** once for each Category you
      wish to add (assuming you want all these Categories listed sequentially from where you've
      selected).
01. Click elsewhere on the page to dismiss the context menu.
01. Select the unnamed Category item(s) (with the placeholder text "Category Name"), and enter a
    name for it.
    - **Note:** A "Category" context menu will pop up to indicate that you've selected the Category
      item, but you won't see a text cursor until you begin typing.

### Enable Groups in a Category

Before you can [add a Group](#add-a-group) to a Category, you will first need to enable Groups
within that Category:

01. While in [Edit Mode](/ContentEditorUserGuide/#edit-mode), select the desired Category, and,
    within its context menu, under "Category," click **Sub**.
01. Click elsewhere on the page to dismiss the context menu.
01. An unnamed Group will have appeared under the Category; to continue, see Step 4 of the [Add a
    Group](#add-a-group) instructions.

### Add a Group

To add a Group to a Filter By Group Component:

01. Before adding a Group to a Category, you need to [enable Groups](#enable-groups-in-a-category)
    for that Category.
01. While in [Edit Mode](/ContentEditorUserGuide/#edit-mode), select the Group directly above where
    you'd like to add a new Group, and, within its context menu, under "Group," click **Add**.  
    ![Group Context Menu](assets/GroupContextMenu.jpg ':size=200')
    - If you intend to add multiple Groups to this Category, you may click **Add** once for each
      Group you wish to add (assuming you want all these Groups listed sequentially from where
      you've selected).
01. Click elsewhere on the page to dismiss the context menu.
01. Select the unnamed Group, and, within its context menu, under "Group," click **Name**.
01. In the _Group Membership_ form, provide the name of the Group you would like to use.
    - To use an existing Group, begin typing in the text field, and select the desired Group name
      when the autocompletion provides it.  
      ![Group Membership Form](./assets/GroupMembershipForm.jpg ':size=50%')
      - To see a list of the available Groups, click **View All Groups**.
        - Click the "X" icon to close the modal.  
          (You will need to re-click **Name** to reopen the _Group Membership_ form.)
    - To create a new Group, simply type the name of a Group that doesn't already exist, and press
      `Enter`.
      - An easy way to confirm that the Group doesn't already exist is that the message "No matching
        groups found." will be displayed below the text field.
01. Your selected Group — whether you are adding or creating — should appear in a badge below the
    text field.  
    ![Group Membership Form with a selected Group](./assets/GroupMembershipFormGroupSelected.jpg
    ':size=50%')
    - If you want to use a different Group:
      - Click the "X" icon on the badge to remove the current selection, and select/enter the Group
        name you want; or
      - Just enter the Group name you want and press `Enter`; the name in the badge below the text
        field will automatically update.
01. Click the checkmark to confirm your Group.

### Delete a Category or Group

To remove a Category or Group from a Filter By Group Component, while in [Edit
Mode](/ContentEditorUserGuide/#edit-mode), select the Category or Group you'd like to remove, and,
within its context menu, under the associated section (i.e., "Category" or "Group"), click
**Delete**.

### Configure a Preset Filter

To curate specific content to your users, you are able to save a selection of Groups as a custom
filter that will be presented upon page load. A saved filter selection is stored as page data,
making it local to the page; in this way, you can have multiple pages with Filter By Group
Components, each with independently configured saved filters.

?> **Note:** As mentioned previously, Filter By Group Components can be configured to use the same
sitewide data source. While linked filters will share Categories and Groups across pages, Preset
Filters are saved at page-level and not shared.

By creating a Preset Filter, you will be locking the Filter UI — disabling the
radio-buttons/checkboxes — preventing your users from selecting alternative search filters.

?> **Note:** In the URI of the page your Filter By Group Component is on, you can see the filter
parameters in the query component; by modifying the query string, a user could select a filter
independent of your Preset Filter.

To create or modify a Preset Filter:

01. Ensure that a Site Builder has configured your target page with a Filter By Group Component that
    has the ability to configure a Preset Filter enabled.
    - A quick way to check this is to:
      01. Go to the desired page.
      01. Enter [Edit Mode](/ContentEditorUserGuide/#edit-mode).
      01. Select a Category or Group in the Filter By Group Component.
          - If no Categories or Groups have been added yet, select the unnamed Category item (with
            the placeholder text "Category Name") that's at the top of the empty filter.
      01. If the context menu has a "Filter" section with a **Page** button, then the Preset Filter
          feature is enabled for that page; otherwise, you will need to contact a Site Builder /
          Developer to enable it for you.
          - For instructions on enabling this feature, see: [Add Preset
            Filters](#add-preset-filters).
01. Using the instructions above, set up a Filter By Group Component with the desired Categories and
    Groups.
    - [Add a Category](#add-a-category)
    - [Enable Groups in a Category](#enable-groups-in-a-category)
    - [Add a Group](#add-a-group)
01. Select the Groups defining the filter that returns the desired search results.
01. While in [Edit Mode](/ContentEditorUserGuide/#edit-mode), select a Category or Group, and,
    within its context menu, under "Filter," click **Page**.
    - **Note:** When bringing up the context menu, if you select a Group, make sure to select a
      Group that is part of your filter selection; otherwise, you will have to unselect the Group
      you selected and fix your filter.
01. You will be presented with the _Filter Page_ modal.
    - If you're **creating a Preset Filter**, the modal will read, "Clicking the check will save the
      current Local Filter UI selections to the Page, creating a Save State."
      01. Click the checkmark to confirm; or  
          Click the "X" icon to cancel.
      01. If successful, you will see the confirmation message, "Page now filtered by Saved State on
          page load."
      01. Click the "X" icon (or elsewhere on the page) to dismiss the message.
    - If you're **modifying an existing Preset Filter**, the modal will read, "The Saved State is
      filtering this Page for the End User," and you'll see a couple radio buttons.
      01. Select "Reset Local Filter UI to Saved State."
      01. Click the checkmark to confirm; or  
          Click the "X" icon to cancel.
      01. If successful, you will see the confirmation message, "UI Filter reset to Saved State."
      01. Click the "X" icon (or elsewhere on the page) to dismiss the message.
01. Click the **Edit** button to toggle to [Review Mode](/ContentEditorUserGuide/#review-mode), and
    confirm that the correct filter is displayed and that the Filter UI is locked (i.e., the filter
    cannot be changed).

?> **Note:** If you delete a Group from a Filter By Group Component, and that Group is saved in a
Preset Filter, the Group will remain in the Preset Filter, and the resulting content shown will
still reflect that Group being part of the Filter.  
<br>
To take advantage of this, you could add Groups to a Filter By Group Component, use them to set up a
Preset Filter, and then remove them, thus concealing what Groups are being used to filter the
displayed content from the user.

### Delete a Preset Filter

To remove a Preset Filter:

01. While in [Edit Mode](/ContentEditorUserGuide/#edit-mode), select a Category or Group, and,
    within its context menu, under "Filter," click **Page**.
01. You will be presented with the _Filter Page_ modal, which will read, "The Saved State is
    filtering this Page for the End User," and you'll see a couple radio buttons.
    01. Select "Clear Saved State from Page."
    01. Click the checkmark to confirm; or  
        Click the "X" icon to cancel.
01. If successful, you will see the confirmation message, "The Saved State has been cleared."
    - Click the "X" icon (or elsewhere on the page) to dismiss the message.

## Site Builder Details

### Usage

```jsx
import { FilterByGroupClean as FilterByGroup } from '@bodiless/filtering';

const suggestions = [
  { id: '1', name: 'Tag 1' },
  { id: '2', name: 'Tag 2' },
  { id: '3', name: 'Tag 3' },
];
// A clean, not styled version
<FilterByGroup suggestions={suggestions}>
  // <FilterableComponentOne>
  // <FilterableComponentTwo>
  // ...
</FilterByGroup>
```

### Styling

```js
import flow from 'lodash/flow';
import { FilterByGroupClean } from '@bodiless/filtering';
import { withDesign, addClasses, addProps } from '@bodiless/fclasses';
import { asTextColorPrimary } from '../Elements.token';

const withTagListStyles = withDesign({
  Title: flow(
    addProps({ emptyTitleText: 'Group' }),
    withDesign({
      FilterInputWrapper: addClasses('flex pb-2 items-center'),
      FilterGroupItemInput: addClasses('mr-3'),
      FilterGroupItemPlaceholder: addClasses('text-gray-600'),
      FilterGroupItemLabel: addClasses(''),
    }),
  ),
  Wrapper: addClasses('m-2 pl-2'),
});

const withCategoryListStyles = withDesign({
  Title: addClasses('font-bold'),
});

const asFilterByGroupStyled = flow(
  withFBGSuggestions({ suggestions }),
  addProps({ resetButtonText: 'Show All Products' }),
  withDesign({
    Wrapper: addClasses('flex'),
    FilterWrapper: addClasses('p-2 mr-5 w-1/4 bg-gray-400 flex flex-col'),
    ContentWrapper: addClasses('p-2 w-3/4'),
    ResetButton: flow(
      addClasses('my-2 underline self-end'),
      asTextColorPrimary,
    ),
    Filter: withDesign({
      TagList: withTagListStyles,
      CategoryList: withCategoryListStyles,
    }),
  }),
);

const FilterByGroup = asFilterByGroupStyled(FilterByGroupClean);

export default FilterByGroup;
```

### Context

Every component placed inside of `FilterByGroup` will have access to `FilterByGroupContext`:

```js
import { useFilterByGroupContext } from '@bodiless/filtering';

const InsideFilterByGroup = (props) => {
  const {
    useRegisterSuggestions,
    getSuggestions,
    setSelectedTag,
    selectedTag,
  } = useFilterByGroupContext();

  // Get All Suggestions
  const allSuggestions = getSuggestions();

  // Callback To Register New Suggestion
  const addTag = useRegisterSuggestions();
  addTag([{ id: '1', name: 'Tag 1' }]);

  const setSelected = (tag) => setSelectedTag(tag);
  const resetSelected = () => setSelectedTag();
}
```

### Add Preset Filters

To use Preset Filters, the feature expects that node data is being shared by being placed at the
_site_ [Node Collection](/Development/Architecture/Data#node-collections) level, and that the node
key is shared with the primary filter's Categories and Groups.

?> **Tip:** Passing `nodeCollection: 'site'` in `withNodeKey({ nodeKey: 'filter', nodeCollection:
'site' })` will save data at site-level instead of page-level.

The suggested pattern is to move your primary filtered data to a sitewide collection by setting
`withNodeKey` to use the `nodeCollection` 'site'.  
For example:

01. Move the data being filtered to a sitewide collection:
    ```tsx
    const ProductListingFlowContainer = flowHoc(
      asFilterableProductContainer,
      withProductStrictSnapSize,
      withProductVariations,
      asFlowContainerFullWidth,
      asFlowContainerWithMargins,
      withNodeKey({ nodeKey: 'product_listing_cards', nodeCollection: 'site' }),
    )(FlowContainer);
    ```
01. Move the Categories and Groups of your filter to a sitewide collection:
    ```tsx
    const withSiteWideFilter = withDesign({
      Filter: withNodeKey({ nodeKey: 'filter', nodeCollection: 'site' }),
    });

    export const FilterByGroupSingleSiteWide = flow(
      asFilterByGroup,
      withSingleAllowedTag,
      withSiteWideFilter,
    )(FilterByGroupClean);
    ```
    - **Note:** The Preset Filter requires sitewide data and a sitewide token; adding the token
      `withSiteWideFilter` will add the sitewide filter feature to a filter.

<!-- Inlining HTML to add multi-line info block with unordered list. -->
<div class="warn">
  <strong>Note:</strong> For additional context, the above code snippets were borrowed from the
  BodilessJS Test Site:

  - [`/src/components/ProductListing/ProductListingFlowContainer.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/ff5b9a01e83b13eae171a07fedfdf186c3184f77/examples/test-site/src/components/ProductListing/ProductListingFlowContainer.tsx#L32-L39)
  - [`/src/components/FilterByGroup/index.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/ff5b9a01e83b13eae171a07fedfdf186c3184f77/examples/test-site/src/components/FilterByGroup/index.tsx#L60-L68)

</div>

?> **Note:** If any content already exists on your site, move the JSON files to `/src/data/site`.

Then, apply your filter and data container tokens in the relevant page, template, or component.

If your primary filter (e.g., on the Products (`/products`) page) and your Preset Filter component
won't use the same tokens (say, one needs a reset button and one doesn't), then we suggest you
compose two tokens — but they both must include `withSiteWideFilter`. Remember, as well, that they
must share the same filter node key that is stored at site level.  
For example:

```tsx
const withSiteWideFilter = withDesign({
  Filter: withNodeKey({ nodeKey: 'filter', nodeCollection: 'site' }),
});

export const FilterByGroupSingleSiteWide = flow(
  asFilterByGroup,
  withSingleAllowedTag,
  withSiteWideFilter,
)(FilterByGroupClean);

const withSingleAllowedTagNoReset = flowHoc(
  addProps({
    multipleAllowedTags: false,
    resetButtonText: '',
  }),
  withDesign({
    ResetButton: flowHoc(
      replaceWith(Fragment),
    ),
    Filter: withFilterSelection(),  // Preset Filter feature
  }),
);

// Preset Filter component
export const FilterByGroupSingleSiteWideNoReset = flow(
  asFilterByGroup,
  withSiteWideFilter,
  withSingleAllowedTagNoReset,
)(FilterByGroupClean);
```
