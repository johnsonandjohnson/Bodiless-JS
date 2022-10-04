// Copy from bodiless-navigation for the Burger Icon toggler..

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

import React, { FC, KeyboardEvent } from 'react';
import { HOC } from '@bodiless/fclasses';

import { useBurgerMenuContext } from './BurgerMenuContext';

const BurgerMenuKeyPressHandler = (event: KeyboardEvent, isVisible: boolean, toggle: Function) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      toggle(!isVisible);
      break;

    default:
      break;
  }
};

/**
 * HOC that adds an ability to toggle Burger Menu visibility on click.
 * It extends Component's default onClick handler if exists. Note that
 * the Component has to be inside a BurgerMenuContext.
 *
 * Also adds default props related to accessibility.
 *
 * @return Original component with extended onClick handler that toggles Burger Menu visibility.
 */
export const asBurgerIconToggler: HOC = Component => {
  const asBurgerIconToggler: FC<any> = props => {
    const {
      isVisible, toggle, isTransitionComplete, setIsTransitionComplete,
    } = useBurgerMenuContext();
    const { onClick, ...rest } = props;

    const extendOnClick = () => {
      if (onClick && typeof onClick === 'function') onClick();
      toggle(!isVisible);

      // Wait for the animations to complete then toggle isTransitionComplete.
      // This prevents unnecessary animation plays on initial render
      // as well as when resizing browser viewport to tablet/mobile manually.
      setTimeout(() => setIsTransitionComplete(!isTransitionComplete), 500);
    };

    return (
      <Component
        onClick={extendOnClick}
        tabIndex="0"
        role="button"
        onKeyPress={(event: KeyboardEvent) => BurgerMenuKeyPressHandler(event, isVisible, toggle)}
        aria-expanded={!!isVisible}
        {...rest}
      />
    );
  };
  return asBurgerIconToggler;
};
