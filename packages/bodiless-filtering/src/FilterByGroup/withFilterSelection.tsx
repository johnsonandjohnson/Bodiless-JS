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

import React, { useCallback, useEffect, useState } from 'react';
import { useFormState } from 'informed';
import {
  withEditButton,
  EditButtonOptions,
  ifEditable,
  withLocalContextMenu,
  withContextActivator,
  ContextMenuFormProps,
  getUI,
  useEditContext,
} from '@bodiless/core';
import {
  withNodeDataHandlers,
  withSidecarNodes,
  withNode,
  withNodeKey,
  useNode,
  ContentNode,
} from '@bodiless/data';
import {
  flowHoc,
  withDesign,
  withoutProps,
  ComponentOrTag,
  addProps,
  flowIf,
} from '@bodiless/fclasses';
import { useFilterByGroupContext } from './FilterByGroupContext';
import type { NodeTagType, DefaultFilterData } from './types';

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
const getRenderForm = (node: ContentNode<DefaultFilterData>) => (props: ContextMenuFormProps) => {
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
  const { tags: defaultTags = [] } = node.data;
  const [step, setStep] = useState(1);
  const { values } = useFormState();

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
        node.setData(submitValues);
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
        node.setData({ tags: currentTags });
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
          name="filterSelectionAction"
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
          name="filterSelectionAction"
          keepState
          initialValue={FilterSelectionAction.reset}
        >
          <ComponentFormLabel key={FilterSelectionAction.reset}>
            <ComponentFormRadio value={FilterSelectionAction.reset.toString()} />
            Reset Local Filter UI to Saved State
          </ComponentFormLabel>
          <ComponentFormLabel key={FilterSelectionAction.clear}>
            <ComponentFormRadio value={FilterSelectionAction.clear.toString()} />
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

const useRenderForm = () => {
  const { node } = useNode();
  return getRenderForm(node);
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
    renderForm: useRenderForm(),
    hasSubmit: false,
  };
  return filterSelectionMenuOptions;
};

const useIsDisabled = (props: any) => {
  const { node } = useNode<DefaultFilterData>();
  const { tags } = node.data;
  const { isEdit } = useEditContext();
  return !!tags?.length && !isEdit;
};

const withTagListDesign = withDesign({
  Title: withDesign({
    FilterGroupItemInput: addProps({ disabled: true }),
  }),
});
export const asDefaultFilter = flowIf(useIsDisabled)(withDesign({
  TagList: withTagListDesign,
}));

/**
 * HOC applies page default filter to Filter component.
 *
 * @private
 * @param Component filter component.
 * @return HOC
 */
const withFilterDefaultSelection = <P extends object>(Component: ComponentOrTag<P>) => {
  const WithFilterDefaultSelection = (props: P) => {
    const { updateSelectedTags } = useFilterByGroupContext();
    const { node } = useNode<DefaultFilterData>();
    const { tags = [] } = node.data;
    useEffect(() => {
      if (tags.length > 0) {
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
 * Creates an HOC which allows a content editor to specify a set of default
 * filter selections which will be applied whenever a filterable content
 * listing is displayed.
 *
 * This adds a button to the local context menu which, when clicked, saves
 * the current state of the filter selection as the default.
 *
 * For example, imagine your filters consisted a single "Color" category
 * with "Red", "Blue" and "Green" terms. A content editor could select
 * "Blue", and use the button to save this choice as the default
 * filter selection for this page. Whenever a site visitor viewed the
 * page in the browser, this filter would be pre-selected.
 *
 * If the filtered items themselves were stored at site level, then multiple
 * such pages could be created, each with a different set of defautl filters,
 * and these could be used as the basis for category landing pages.
 *
 * @param nodeKey
 * The node key defining where the default filter selection will be stored.
 * Should usually be a page-level node.
 *
 * @param defaultData
 * Initial defaults for the default filter selections.
 *
 * @returns
 * HOC which adds the functionality. This HOC must be applied to the
 * [[FilterClean]] component.
 */
const withFilterSelection = (
  nodeKey: Parameters<typeof withNodeKey>[0] = 'content-listing',
  defaultData: Parameters<typeof withNodeDataHandlers>[0] = { tags: [] },
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
    asDefaultFilter,
  ),
);

export default withFilterSelection;
