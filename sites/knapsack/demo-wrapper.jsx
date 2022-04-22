import * as React from 'react';
// import { KsEditProvider } from '@canvasx/elements';
import './demo-wrapper.css';

/** should be either 'yes' or 'no' - set from Asset Sets defined in `knapsack.asset-sets.json` */
const attr = document.body.getAttribute('ks-renderer-bodiless-is-editable');
const isEditable = attr === 'yes';

const DemoWrapper = ({ children }) => {
  const className = 'demo-wrapper';
  // return React.createElement(KsEditProvider, { className: "demo-wrapper" }, children);
  // return <div className="demo-wrapper">{children}</div>;
  return React.createElement('div', { className }, children);
};

export default DemoWrapper;
