/**
 * Copyright © 2022 Johnson & Johnson
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

// import React from 'react';
// import { useNode } from '@bodiless/core';
import { addProps, withDesign } from '@bodiless/fclasses';

// const withAnalyticsAttr: HOC = Component => props => {
//   const { node } = useNode();
//   const titleNode = node.child<{ text: string }>('title$text');
//   return <Component data-layer-menu_item={titleNode.data.text} {...props} />;
// };

const withMenuTitleAnalytics = withDesign({
  Title: addProps({ 'data-layer-menu_item': 'TITLETEXT'}),
});

export default withMenuTitleAnalytics;
// export { withAnalyticsAttr };
