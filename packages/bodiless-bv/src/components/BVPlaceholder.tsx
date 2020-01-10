/**
 * Copyright © 2019 Johnson & Johnson
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

import React, { FC, HTMLProps } from 'react';
import { Div } from '@bodiless/fclasses';
import { BVProps, withoutBVProps } from './BVProps';

type DivProps = HTMLProps<HTMLDivElement>;

export type Props = DivProps & BVProps;

const BVPlaceholder: FC<Props> = props => {
  const { componentName, productId } = props;
  const BVWidgetName = componentName || 'BV widget';
  const props$1 = withoutBVProps(props);
  return (
    <Div {...props$1}>
      {`
      ${BVWidgetName} with Product External Id: "${productId}" will be rendered here.
      If your domain is whitelisted, you will see BV generated widget in preview mode.
    `}
    </Div>
  );
};

export default BVPlaceholder;
