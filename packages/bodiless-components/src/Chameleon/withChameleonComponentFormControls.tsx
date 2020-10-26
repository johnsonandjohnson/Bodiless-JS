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

import React, { ComponentType, FC } from 'react';

import { flowRight } from 'lodash';
import { ChameleonButtonProps } from './types';
import { DEFAULT_KEY, useChameleonContext } from './withChameleonContext';
import { withUnwrap } from './withChameleonButton';

const withWrapOnSubmit = <P extends object>(Component: ComponentType<P>) => {
  const WithWrapOnSubmit: FC<P & ChameleonButtonProps> = props => {
    const { isOn, setActiveComponent, selectableComponents } = useChameleonContext();
    if (isOn) return <Component {...props} />;
    const newKey = Object.keys(selectableComponents).find(key => key !== DEFAULT_KEY) || null;
    return <Component {...props} onSubmit={() => setActiveComponent(newKey)} />;
  };
  return WithWrapOnSubmit;
};

const withChameleonComponentFormControls = flowRight(
  withWrapOnSubmit,
  withUnwrap,
);

export default withChameleonComponentFormControls;
