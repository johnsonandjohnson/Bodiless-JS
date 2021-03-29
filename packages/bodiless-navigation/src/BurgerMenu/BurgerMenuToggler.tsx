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

import React, { FC, ComponentType } from 'react';
import { flow } from 'lodash';
import {
  Fragment, A, DesignableComponentsProps, designable,
} from '@bodiless/fclasses';

import { useBurgerMenuContext } from './BurgerMenuContext';
import { withBurgerMenuTogglerStyles } from './BurgerMenu.token';

type TogglerComponents = {
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
 * @return Original component with extended onClick handler that toggles Burger Menu visibility.
 */
const asBurgerMenuToggler = <P extends object>(Component: ComponentType<P>) => (
  props: P & { onClick?: () => any },
) => {
  const {
    isVisible, toggle, isTransitionComplete, setIsTransitionComplete,
  } = useBurgerMenuContext();
  const { onClick } = props;

  const extendOnClick = () => {
    if (onClick && typeof onClick === 'function') onClick();
    toggle(!isVisible);

    // Wait for the animations to complete then toggle isTransitionComplete.
    // This prevents unnecessary animation plays on initial render
    // as well as when resizing browser viewport to tablet/mobile manually.
    setTimeout(() => setIsTransitionComplete(!isTransitionComplete), 500);
  };

  return <Component {...props} onClick={extendOnClick} />;
};

/**
 * Clean Unstyled version of Burger Menu Toggler button.
 * Has an onClick handler that toggles BurgerMenuContext 'isVisible' prop.
 *
 * For this button to work both burger menu and toggler button should be inside BurgerMenuContext.
 *
 * @return Burger Menu default toggler component.
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
 */
const BurgerMenuDefaultToggler = withBurgerMenuTogglerStyles(BurgerMenuTogglerClean);

export {
  BurgerMenuTogglerClean,
  BurgerMenuDefaultToggler,
};
