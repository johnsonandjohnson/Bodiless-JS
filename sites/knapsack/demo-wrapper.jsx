import * as React from 'react';
import { KsEditProvider } from '@bodiless/knapsack-edit-provider';
import './demo-wrapper.css';

/** should be either 'yes' or 'no' - set from Asset Sets defined in `knapsack.asset-sets.json` */
const attr = document.body.getAttribute('ks-renderer-bodiless-is-editable');
const isEditable = attr === 'yes';

const DemoWrapper = ({ children }) => {
  const className = 'demo-wrapper';
  return isEditable
    ? React.createElement(KsEditProvider, { className }, children)
    // @todo When it is not editable, components still show edit controls
    // even though no data gets saved (since `KsEditProvider` is not rendered).
    : React.createElement('div', { className }, children);
};

export default DemoWrapper;
