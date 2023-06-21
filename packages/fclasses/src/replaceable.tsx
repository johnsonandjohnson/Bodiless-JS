/**
 * Copyright © 2022 Johnson & Johnson
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

import React, {
  ComponentType,
  FC,
  useContext,
  useState,
  useEffect,
  Fragment,
} from 'react';
import pick from 'lodash/pick';
import { ComponentOrTag, HOC } from './types';
import { flowHoc } from './flowHoc';

const designContextDefault = undefined as undefined | ComponentType<any>;
const DesignContext = React.createContext(designContextDefault);

/**
 * HOC which makes a component capable of replacement via [[startWith]].
 *
 * This is used under the hood by [[designable]] to make all starting
 * components replaceable.  If you want to use [[startWith]] outside
 * of the design, you must use this yourself.
 *
 * You can also use this to reset the "base" so that some modifications
 * made by HOCs are also replaced.
 *
 * @example
 * ```ts
 * const withBase = withDesign({
 *   Wrapper: as(
 *     'bg-black-700',
 *     replaceabe,
 *     'text-green-700',
 *   ),
 * });
 * const withRepl = withDesign({
 *   Wrapper: startWith(Section),
 * });
 * const BlackAndGreenDiv = withBase(Div); // A 'div' with black bg and green text
 * const GreenSection = withRepl(BlackAndGreenDiv); // A 'section' with green text.
 * ```
 * Because of the addition of `replaceable`, the resulting `GreenSection` will not
 * have the black background, though it will have the green text.
 *
 * @see startWith
 *
 * @category HOC Utility
 */
export const replaceable: HOC = Component => {
  const Replaceable: FC<any> = props => {
    const UpstreamComponent = React.useContext(DesignContext);
    const FinalComponent = UpstreamComponent || Component;
    return (
      <DesignContext.Provider value={undefined}>
        <FinalComponent {...props} />
      </DesignContext.Provider>
    );
  };
  return Replaceable;
};

/**
 * Creates an HOC which replaces a base component with a specified replacement.
 * Unlike [[replaceWith]], this function replaces the base component but leaves
 * any previously applied tokens intact.
 *
 * > **Important Note** `startWith` can only be used in the context of `withDesign`
 *
 * @param ReplacementComponent
 * The component to use as a replacement
 *
 * @returns
 * HOC which removes the original component and renders the replacement instead.
 *
 * @see `replaceWith`
 * @example
 *  ```js
 *  const ExampleBase = ({ components: C, ...rest }) => <C.Tag {...rest} />;
 *  const ExampleClean = designable({ Tag: Span })(ExampleBase);
 *  const Example = withDesign({
 *    Tag: addClasses('text-blue'),
 *  })(Example); // <span className="text-blue" />
 *  const StartWith = withDesign({
 *    Tag: startWith(Div),
 *  })(Example) // <div className="text-blue" />
 *  const ReplaceWith = withDesign({
 *    Tag: replaceWith(Div),
 *  })(Example) // <div />
 *  ```
 * @category HOC Utility
 */

export const startWith = (ReplacementComponent: ComponentType<any>): HOC => Component => {
  const StartWith: FC<any> = props => {
    const UpstreamComponent = useContext(DesignContext);
    return UpstreamComponent
      ? <Component {...props} />
      : (
        <DesignContext.Provider value={ReplacementComponent}>
          <Component {...props} />
        </DesignContext.Provider>
      );
  };
  return StartWith;
};
/**
 * Returns a HOC which replaces the component to which it is applied with another.
 * Unlike `startWith`, this replaces the component along with any HOCs which
 * had previously been applied.
 *
 * @param Replacement
 * The component or tag to use as a replacement.
 *
 * @returns
 * An HOC which renders the replacement in place of the target.
 *
 * @see `startWith`
 *
 * @example
 * ```js
 * import { Div, replaceWith } from `@bodiless/fclasses`;
 * const StartBase = Div; // <div />
 * const Start = addClasses('text-blue')(Start); // <div className="text-blue" />
 * const Replaced = replaceWith('span')(Start); // <span />
 * ```
 *
 * @category HOC Utility
 */

export const replaceWith = <P extends object>(Replacement: ComponentOrTag<P>) => flowHoc(
  (() => {
    const ReplaceWith = (props: P) => {
      const $props = Replacement === Fragment ? pick(props, 'key', 'children') : props;
      return <Replacement {...$props as P} />;
    };
    return ReplaceWith;
  }) as HOC
);

/**
 * HOC which replaces the component with a fragment.  Note that the children of
 * the component (if any) will still be rendered.  If you want to completely remove
 * a component and all its children, use `replaceWith(() => null)`
 *
 * @param Component
 * The component to replace
 *
 * @returns
 * A fragment.
 *
 * @category HOC Utility
 */

export const remove = <P extends React.HTMLAttributes<HTMLBaseElement>>() => (props: P) => {
  const { children } = props;
  return <>{children}</>;
};

/**
 * Like [[replaceWith]], but performs the replacement on effect. Useful when you need to
 * ensure that both versions of a component are rendered during SSR, but want to
 * remove one when displayed in the browser (eg for responsive design).
 *
 * @param Replacement The component to replace with.
 *
 * @category HOC Utility
 */
export const replaceOnEffect = <P extends object>(
  Replacement: ComponentType<P>,
) => (
    Component: ComponentType<P>,
  ) => {
    const ReplaceOnEffect = (props: P) => {
      const [replaced, setReplaced] = useState(false);
      useEffect(() => setReplaced(true), []);
      return replaced ? <Replacement {...props} /> : <Component {...props} />;
    };
    return ReplaceOnEffect;
  };
