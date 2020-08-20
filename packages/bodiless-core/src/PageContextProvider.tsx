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

import React, { FC, useRef, ComponentType } from 'react';
import PageEditContext from './PageEditContext';
import { useEditContext, useUUID } from './hooks';
import { Props, MenuOptionsDefinition, TMenuOptionGetter } from './Types/PageContextProviderTypes';

/**
 * @private
 *
 *  Hook to create the values needed to define a new context from the supplied props.
 *
 * @param props The props defining the `PageEditContext`
 * @return Values suitable for passing to the `PageEditContext` constructor.
 */
const useNewContextValues = ({ getMenuOptions, name, id }: Props) => {
  const ref = useRef<TMenuOptionGetter>();
  ref.current = getMenuOptions;
  const id$ = id || useUUID();
  return {
    getMenuOptions: () => (ref.current || getMenuOptions!)(),
    id: id$,
    name: name || id$,
  };
};

/**
 * Hook which registers additional menu options for the current context.
 *
 * @param props Props which define the menu options to add.
 */
export const useRegisterMenuOptions = (props: Props) => {
  const values = useNewContextValues(props);
  const context = useEditContext();
  context.registerPeer(values);
};

/**
 * Component which provides its children with a new `PageEditContext` using the specified
 * menu options.
 *
 * @param props
 */
const PageContextProvider: FC<Props> = ({ children, ...rest }) => {
  const values = useNewContextValues(rest);
  const context = useEditContext();
  // eslint-disable-next-line react/destructuring-assignment
  const newValue = context.spawn(values);
  return (
    <PageEditContext.Provider value={newValue}>
      {children}
    </PageEditContext.Provider>
  );
};

PageContextProvider.defaultProps = {
  getMenuOptions: () => [],
};

/**
 * Using supplied options, returns an HOC which adds one or more menu options (buttons).
 * This simplly wraps the supplied component with a `PageContextProvider`.
 *
 * Note that, unlike `PageContexProvider` itself, this function takes a custom hook
 * (`useGetMenuOptions`), which is invoked to create the 'getMenuOptions' prop
 * for `PageContextProvider`.  This allows you to use props and context at render
 * time to create your `getMenuOptions` callback.
 *
 * Based on the value of the `peer` option, this will associate the menu options either
 * with a new local context (`peer === false`, the default), or with the existing one.
 *
 * @param options The values used to define the menu options.
 *
 * @return An HOC which will cause the component it enhances to contribute the specified
 *         menu options when placed.
 */
export const withMenuOptions = <P extends object>({
  useGetMenuOptions,
  peer,
  ...rest
}:MenuOptionsDefinition<P>) => (Component: ComponentType<P> | string) => {
    const WithMenuOptions = (props: P) => {
      const getMenuOptions = useGetMenuOptions
        ? useGetMenuOptions(props, useEditContext())
        : undefined;
      if (peer) {
        useRegisterMenuOptions({ getMenuOptions, ...rest });
        return <Component {...props} />;
      }
      return (
        <PageContextProvider getMenuOptions={getMenuOptions} {...rest}>
          <Component {...props} />
        </PageContextProvider>
      );
    };
    return WithMenuOptions;
  };

export default PageContextProvider;
