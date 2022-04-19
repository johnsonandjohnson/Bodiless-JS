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

import React, { FC, ComponentType, KeyboardEvent } from 'react';
import flow from 'lodash/flow';
import {
  Fragment, A, DesignableComponentsProps, designable, HOC,
} from '@bodiless/fclasses';

import { useBurgerMenuContext } from './BurgerMenuContext';
import { withBurgerMenuTogglerStyles } from './BurgerMenu.token';
import BurgerMenuKeyPressHandler from './BurgerMenuKeyboard';

export type TogglerComponents = {
  Wrapper: ComponentType<any>,
  Button: ComponentType<any>,
};

type TogglerProps = DesignableComponentsProps<TogglerComponents>;

const TogglerComponents: TogglerComponents = {
  Wrapper: Fragment,
  Button: A,
};

const TogglerBase: FC<TogglerProps> = ({ components, ...rest }) => {
  const { Wrapper, Button } = components;
  const { isVisible } = useBurgerMenuContext();

  return (
    <Wrapper>
      <Button {...rest}>
        {isVisible ? 'close' : 'menu' }
      </Button>
    </Wrapper>
  );
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
export const asBurgerMenuToggler: HOC = Component => {
  const AsBurgerMenuToggler: FC<any> = props => {
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
  return AsBurgerMenuToggler;
};

/**
 * Clean Unstyled version of Burger Menu Toggler button.
 * Has an onClick handler that toggles BurgerMenuContext 'isVisible' prop.
 *
 * For this button to work both burger menu and toggler button should be inside BurgerMenuContext.
 *
 * @return Burger Menu default toggler component.
 * @deprecated
 */
const BurgerMenuTogglerClean = flow(
  designable(TogglerComponents, 'BurgerMenuToggler'),
  asBurgerMenuToggler,
)(TogglerBase);

/**
 * Default Burger Menu Toggler button. Toggles button icon based on the
 * burger menu state ('close' | 'menu'). Has an onClick handler that toggles
 * BurgerMenuContext 'isVisible' prop.
 *
 * For this button to work both burger menu and toggler button should be inside BurgerMenuContext.
 *
 * @return Burger Menu default toggler component.
 *
 * @deprecated
 */
const BurgerMenuDefaultToggler = withBurgerMenuTogglerStyles(BurgerMenuTogglerClean);

export {
  BurgerMenuTogglerClean,
  BurgerMenuDefaultToggler,
};
