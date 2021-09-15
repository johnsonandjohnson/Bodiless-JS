/**
 * Copyright © 2020 Johnson & Johnson
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

import React, { FC } from 'react';
import { withoutProps, asToken, HOC } from '@bodiless/fclasses';
import { applyChameleonDesign, useChameleonContext } from './withChameleonContext';
import { ChameleonProps } from './types';

/**
 * Applies the appropriate design to the wrapped component depending on the
 * chameleon state.  Must be called within a context defined by `withChameleonContext`.
 *
 * Use this function when you want to separate the form controlling the chameleon
 * state from the component on which the chameleon acts (for example, if you want
 * to add controls to a component edit form, but actually act on the component
 * to which the edit form was added), eg:
 *
 * ```
 * flowRight(
 *   withDesign({
 *     Disabled: flow(replaceWith('span'), withoutProps('href'), withTitle('Disabled'))
 *   }),
 *   withChameleonContext('link-chameleon'),
 *   withChameleonComponenFormConrols,
 *   asBodilessLink('link')
 *   applyChameleon,
 * )('a');
 * ```
 *
 * Note the use of `withTitle` here.  Only design elements with title metadata will be considered
 * valid chameleon states.
 *
 * @return The wrapped component enhanced by the appropriate HOC's from the design.
 */
const applyChameleon: HOC = Component => {
  const Chameleon: FC<Pick<ChameleonProps, 'components'>> = props => {
    const { activeComponent } = useChameleonContext();
    const { components, ...rest } = props;
    const ActiveComponent = components[activeComponent];
    return <ActiveComponent {...rest} />;
  };
  return asToken(
    withoutProps('design'),
    applyChameleonDesign(Component),
  )(Chameleon);
};

export default applyChameleon;
