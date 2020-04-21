import React, { ComponentType } from 'react';
import { ReactTagsField as ReactTagsFieldClean, ReactTagsFieldProps } from '@bodiless/core';

const ReactTagsField: ComponentType<ReactTagsFieldProps> = props => {
  const classes = {
    root: `
      bl-flex bl-relative bl-flex-col-reverse bl-rounded-sm bl-text-xs
      bl-leading-tight bl-cursor-text bl-grey-900`,
    rootFocused: 'is-focused',
    selected: 'bl-max-w-xl-grid-1 bl-inline',
    selectedTag: `
      bl-inline-block bl-box-border bl-mr-grid-1 bl-mb-grid-1
      bl-py-grid-1 bl-px-grid-2 bl-border bl-border-solid
      bl-border-gray-400 bl-grey-900 bl-rounded-sm bl-bg-grey-100
      bl-react-tags__selected-tag`,
    selectedTagName: 'bl-text-grey-900',
    search: 'bl-inline-block bl-py-grid-1 bl-px-grid-0 bl-mb-grid-1 bl-max-w-full bl-min-w-xl-grid-1',
    searchInput: 'bl-text-grey-900 bl-react-tags__search-input',
    suggestions: 'bl-text-grey-900 bl-absolute bl-top-full bl-w-full bl-left-grid-0 bl-z-10 bl-react-tags__suggestions',
    suggestionActive: 'is-active',
    suggestionDisabled: 'is-disabled',
  };

  return (
    <ReactTagsFieldClean
      classNames={classes}
      autoresize={false}
      {...props}
    />
  );
};

export default ReactTagsField;
