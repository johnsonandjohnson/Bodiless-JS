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

import React from 'react';
import { useContextActivator } from './hooks';

type ActivateOnEffectState = {
  id: string,
  setId: (id: string) => void,
};
const defaultActivateOnEffectState: ActivateOnEffectState = {
  id: '',
  setId: () => undefined,
};

/* Activate Context is a context that stores the id that should activate its own context when
 * it is created
 */
const activateOnEffect = React.createContext(defaultActivateOnEffectState);
export const ActivateOnEffectProvider:React.FunctionComponent = ({ children }) => {
  const [id, setId] = React.useState('');
  const value = { id, setId };
  return <activateOnEffect.Provider value={value}>{children}</activateOnEffect.Provider>;
};

/**
 * WithActivateContext is a HOC that wraps the Component in a ActivateContextProvider
 * @param Component The component to wrap
 */
export const withActivateOnEffect = (
  <P extends Object> (Component:React.FunctionComponent<P>) => (props:P) => (
    <ActivateOnEffectProvider><Component {...props} /></ActivateOnEffectProvider>
  )
);

/**
 * useActivateContext is a hook that returns the ActivateContext
 */
export const useActivateOnEffect = () => React.useContext(activateOnEffect);

/**
 * useActivateOnEffect is a hook that will check if a id is stored in the ActivateContext
 * if it is it will run the iseContextActivator hook
 * @param uuid id of the component to check
 */
export const useActivateOnEffectActivator = (uuid: string) => {
  const { onClick } = useContextActivator();
  const { id, setId } = useActivateOnEffect();
  // useEffect has to be at the top level so we have to put the conditional inside the hook
  React.useEffect(() => {
    if (id === uuid && onClick) {
      onClick('');
      setId('');
    }
  });
};
