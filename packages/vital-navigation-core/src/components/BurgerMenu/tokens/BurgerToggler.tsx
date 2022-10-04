import React, {
  createContext, useContext, FC, KeyboardEvent
} from 'react';
import { HOC } from '@bodiless/fclasses';

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

type BurgerMenuContextType = {
  isVisible: boolean,
  isTransitionComplete: boolean,
  toggle: React.Dispatch<React.SetStateAction<boolean>>,
  setIsTransitionComplete: React.Dispatch<React.SetStateAction<boolean>>,
};

const BurgerMenuContext = createContext<BurgerMenuContextType>({
  isVisible: false,
  isTransitionComplete: false,
  toggle: () => null,
  setIsTransitionComplete: () => null,
});

/**
 * A Hook to get the current Burger Menu `isVisible` and `toggle()` context values.
 *
 * @return The current Burger Menu `isVisible` and `toggle()` context values.
 */
const useBurgerMenuContext = () => useContext(BurgerMenuContext);

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
