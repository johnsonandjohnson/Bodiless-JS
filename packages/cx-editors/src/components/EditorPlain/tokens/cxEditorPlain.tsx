import React from 'react';
import {
  NodeProvider, useNode,
} from '@bodiless/core';
import { HOC } from '@bodiless/fclasses';
import { asElementToken } from '@bodiless/cx-elements';
import { withPlaceholder } from '@bodiless/components';
import type { EditableData } from '@bodiless/components';
import { withAutoSuperscript } from '../util';

const convertSlateToEditable = (componentData: any): EditableData => {
  if (!componentData) return { text: '' };
  if (componentData.text !== undefined) {
    return componentData;
  }
  const textValues: string[] = [];
  const searchTextItemsRecursively = (object: Object) => {
    Object.entries(object).forEach(
      entry => {
        const [key, value] = entry;
        if (key === 'text' && typeof value === 'string') {
          textValues.push(value);
        } else if (value !== null && typeof value === 'object') {
          return searchTextItemsRecursively(value);
        }
        return '';
      },
    );
  };
  searchTextItemsRecursively(componentData);
  return { text: textValues.join('\n') };
};

const withSlateTranslator: HOC = Component => props => {
  const { node } = useNode();
  const proxyNode = node.proxy({
    getData: convertSlateToEditable,
  });
  return (
    <NodeProvider node={proxyNode}>
      <Component {...props} />
    </NodeProvider>
  );
};

const WithAutoSuperscript = asElementToken({
  Behavior: {
    _: withAutoSuperscript(undefined, 'align-baseline'),
  },
});

const Default = asElementToken({
  Core: {
    _: withSlateTranslator,
  },
  Content: {
    _: withPlaceholder('Plain text...'),
  },
});

export default { Default, WithAutoSuperscript };
