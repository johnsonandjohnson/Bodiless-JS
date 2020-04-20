# Filter By Group

 - Purpose
   - Add a control which allows to filter content by group/tag with an ability to create a custom filter.
- Properties
  - `suggestions` - a list of default suggestions (tags) - `[{id: '1', name: 'name'}, ...]`
- Editable Areas
  - Filter component ( Filter Categories and Tags )

## Usage
```js
import { FilterByGroupClean } from '@bodiless/organisms';

const suggestions = [
  {id: '1', name: 'Tag 1'},
  {id: '2', name: 'Tag 2'},
  {id: '3', name: 'Tag 3'},
];
// A clean, not styled version
<FilterByGroup suggestions={suggestions}>
  // <FilterableComponentOne>
  // <FilterableComponentTwo>
  // ...
</FilterByGroup>
```

## Styling
```js
import { flow } from 'lodash';
import { FilterByGroupClean } from '@bodiless/organisms';
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

## Context
Every component places inside of FilterByGroup will have an access to FilterByGroupContext:
```js
import { useFilterByGroupContext } from '@bodiless/organisms';

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
  addTag([{id: '1', name: 'Tag 1'}])

  const setSelected = tag => setSelectedTag(tag);
  const resetSelected = () => setSelectedTag();
}
```
