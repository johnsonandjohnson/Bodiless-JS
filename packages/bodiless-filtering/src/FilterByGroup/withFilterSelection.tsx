/**
 * Copyright © 2021 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useCallback, useEffect } from 'react';
import { useFormState, useFormApi } from 'informed';
import {
  withEditButton,
  withNodeDataHandlers,
  EditButtonOptions,
  withSidecarNodes,
  withNode,
  withNodeKey,
  ifEditable,
  ifReadOnly,
  withLocalContextMenu,
  withContextActivator,
  useNode,
  ContextMenuFormProps,
  getUI,
} from '@bodiless/core';
import {
  flowHoc,
  withDesign,
  withoutProps,
  addProps,
  ComponentOrTag,
  flowIf,
} from '@bodiless/fclasses';
import { useFilterByGroupContext } from './FilterByGroupContext';
import type { NodeTagType, FilterTagType } from './types';

enum FilterSelectionAction {
  reset,
  reset_success,
  clear,
  clear_success,
  save,
  save_success,
}

const MSG_SAVE = 'Clicking the check will save the current Local Filter UI selections to this Page, creating a Save State.';
const MSG_SAVE_SUCCESS = 'Page now filtered by Saved State on page load.';
const MSG_RESET_CLEAR = 'The Saved State is filtering this Page for the End User.';
const MSG_RESET_SUCCESS = 'UI Filter reset to Saved State.';
const MSG_CLEAR_SUCCESS = 'The Saved State has been cleared.';

const defaultFiltersPath = [
  'Page',
  'default-filters',
];

/**
 * Custom hook to retrieves default filter data on current page.
 *
 * @private
 */
const useDefaultFiltersData = () => {
  const { node } = useNode();
  const defaultFilters = node.peer(defaultFiltersPath);
  const { tags = [] } = defaultFilters.data as { tags?: FilterTagType[] };
  return { tags };
};

/**
 * Renders default filter form in different use cases:
 * - No existing default filter set yet.
 *   submit form to save the selected tags.
 * - Has saved default filter.
 *    - Clear/remove saved default filter
 *    - Reset current selection to default filter selection.
 *
 * @private
 * @params props Default filter form properties.
 * @returns void
 */
const renderForm = (props: ContextMenuFormProps) => {
  const { node } = useNode();
  const { getSelectedTags, updateSelectedTags } = useFilterByGroupContext();
  const { ui } = props;
  const {
    ComponentFormText,
    ComponentFormDescription,
    ComponentFormLabel,
    ComponentFormRadioGroup,
    ComponentFormRadio,
    ComponentFormSubmitButton,
  } = getUI(ui);
  const { tags: defaultTags = [] } = useDefaultFiltersData();
  const { setStep } = useFormApi();
  const { values, step } = useFormState();

  useEffect(() => {
    if (!defaultTags.length) {
      setStep(FilterSelectionAction.save);
    } else {
      setStep(FilterSelectionAction.reset);
    }
  }, []);

  // eslint-disable-next-line consistent-return
  const handleSubmit = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    const v = values[Object.keys(values)[0]] as any;
    // eslint-disable-next-line default-case
    switch (v.filterSelectionAction) {
      case FilterSelectionAction.clear: {
        const submitValues = { tags: [] };
        updateSelectedTags(submitValues.tags);
        node.peer(defaultFiltersPath).setData(submitValues);
        setStep(FilterSelectionAction.clear_success);
        return submitValues;
      }
      case FilterSelectionAction.reset: {
        updateSelectedTags(defaultTags);
        setStep(FilterSelectionAction.reset_success);
        return { tags: defaultTags };
      }
      case FilterSelectionAction.save: {
        const currentTags = getSelectedTags();
        updateSelectedTags(currentTags);
        node.peer(defaultFiltersPath).setData({ tags: currentTags });
        setStep(FilterSelectionAction.save_success);
        return currentTags;
      }
    }
  }, [values]);

  const SaveForm = useCallback(() => {
    if (step === FilterSelectionAction.save_success) {
      return (
        <ComponentFormDescription>
          {MSG_SAVE_SUCCESS}
        </ComponentFormDescription>
      );
    }

    return (
      <>
        <ComponentFormDescription>
          {MSG_SAVE}
        </ComponentFormDescription>
        <ComponentFormText
          type="hidden"
          field="filterSelectionAction"
          keepState
          initialValue={FilterSelectionAction.save}
        />
        <ComponentFormSubmitButton
          aria-label="Submit"
          onClick={handleSubmit}
        />
      </>
    );
  }, [step]);

  const RestClearForm = useCallback(() => {
    if (step === FilterSelectionAction.clear_success) {
      return (
        <ComponentFormDescription>
          {MSG_CLEAR_SUCCESS}
        </ComponentFormDescription>
      );
    }

    if (step === FilterSelectionAction.reset_success) {
      return (
        <ComponentFormDescription>
          {MSG_RESET_SUCCESS}
        </ComponentFormDescription>
      );
    }

    return (
      <>
        <ComponentFormDescription>
          {MSG_RESET_CLEAR}
        </ComponentFormDescription>
        <ComponentFormRadioGroup
          field="filterSelectionAction"
          keepState
          initialValue={FilterSelectionAction.reset}
        >
          <ComponentFormLabel key={FilterSelectionAction.reset}>
            <ComponentFormRadio value={FilterSelectionAction.reset} />
            Reset Local Filter UI to Saved State
          </ComponentFormLabel>
          <ComponentFormLabel key={FilterSelectionAction.clear}>
            <ComponentFormRadio value={FilterSelectionAction.clear} />
            Clear Saved State from Page
          </ComponentFormLabel>
        </ComponentFormRadioGroup>
        <ComponentFormSubmitButton
          aria-label="Submit"
          onClick={handleSubmit}
        />
      </>
    );
  }, [step, values]);

  return (
    <>
      {(step === FilterSelectionAction.save
        || step === FilterSelectionAction.save_success)
        && <SaveForm />}
      {(step === FilterSelectionAction.reset
        || step === FilterSelectionAction.reset_success
        || step === FilterSelectionAction.clear
        || step === FilterSelectionAction.clear_success)
        && <RestClearForm />}
    </>
  );
};

/**
 * Custom hook to generate a default filter button menu options.
 *
 * @private
 * @returns Default filter button menu option.
 */
const useFilterSelectionMenuOptions = () => {
  const filterSelectionMenuOptions: EditButtonOptions<any, NodeTagType> = {
    name: 'filter-page',
    label: 'Page',
    groupLabel: 'Filter',
    groupMerge: 'none',
    icon: 'filter_alt',
    local: true,
    global: false,
    formTitle: 'Filter Page',
    isHidden: false,
    renderForm,
    hasSubmit: false,
  };
  return filterSelectionMenuOptions;
};

const withTagListDesign = withDesign({
  Title: withDesign({
    FilterGroupItemInput: ifReadOnly(
      flowIf(() => useDefaultFiltersData().tags.length !== 0)(
        addProps({ disabled: true })
      ),
    )
  }),
});
export const asDefaultFilter = withDesign({
  TagList: withTagListDesign,
});

/**
 * HOC applies page default filter to Filter component.
 *
 * @private
 * @param Component filter component.
 * @return HOC
 */
const withFilterDefaultSelection = <P extends object>(Component: ComponentOrTag<P>) => {
  const WithFilterDefaultSelection = (props: P) => {
    const { updateSelectedTags, hasTagFromQueryParams } = useFilterByGroupContext();
    const { tags = [] } = useDefaultFiltersData();
    useEffect(() => {
      if (!hasTagFromQueryParams()) {
        updateSelectedTags(tags);
      }
    }, []);
    return (
      <Component {...props} />
    );
  };
  return WithFilterDefaultSelection;
};

/**
 * HOC adds default filter form and data to filter list. Selected filter data has
 * default nodeKey as 'default-filters'.
 *
 * @param nodeKey Default filter nodeKey for page level storage.
 * @param defaultData default data for default filter selection.
 * @return
 * A composed token.
 */
const withFilterSelection = (
  nodeKey = 'default-filters',
  defaultData = { tags: [] },
) => flowHoc(
  withoutProps(['componentData', 'setComponentData']),
  withSidecarNodes(
    withNodeKey(nodeKey),
    withNode,
    withNodeDataHandlers(defaultData),
    withFilterDefaultSelection,
    ifEditable(
      withEditButton(() => useFilterSelectionMenuOptions()),
      withContextActivator('onClick'),
      withLocalContextMenu,
    ),
  ),
  asDefaultFilter,
);

export default withFilterSelection;
