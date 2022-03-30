import React from 'react';
import { useNode } from '@bodiless/core';
import { HOC, withDesign } from '@bodiless/fclasses';

const withAnalyticsAttr: HOC = Component => props => {
  const { node } = useNode();
  const titleNode = node.child<{ text: string }>('title$text');
  return <Component data-layer-menu_item={titleNode.data.text} {...props} />;
};

const withMenuTitleAnalytics = withDesign({
  Title: withAnalyticsAttr,
});

export default withMenuTitleAnalytics;
export { withAnalyticsAttr };
