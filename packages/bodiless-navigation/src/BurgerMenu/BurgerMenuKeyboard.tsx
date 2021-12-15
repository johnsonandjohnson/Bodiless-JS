import {
  KeyboardEvent,
} from 'react';


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

export default BurgerMenuKeyPressHandler;