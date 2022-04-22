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

import React, { FC } from 'react';
import flow from 'lodash/flow';
import identity from 'lodash/identity';
import { HOC } from '@bodiless/fclasses';

/**
 * Token that will wrap the <sup> tags around a provided set of chars
 *
 * @param chars
 * A string of chars that each will be invidually wrapped in sup.
 * Defaults to ®™
 *
 * @param classname
 * An option string where class name can be applied to <sup> if needed.
 *
 * @returns
 * A function with the same signature as `addProps`
 *
 * @see addProps
 */
export const withAutoSuperscript = (chars: string = '®™', classname: string = ''): HOC => Component => {
  const superscriptSanitizer = (html: string) => html
    .split('')
    .map(c => (chars.includes(c) ? `<sup class='${classname}'>${c}</sup>` : c))
    .join('');
  const WithAutoSuperscript: FC<any> = props => {
    const { useOverrides = () => ({}), ...rest } = props;
    const {
      sanitizer: sanitizerFromOptions = identity, ...restOverridesProps
    } = useOverrides(props);
    const sanitizer = flow(
      superscriptSanitizer,
      sanitizerFromOptions,
    );
    const finalUseOverrides = () => ({
      sanitizer,
      ...restOverridesProps,
    });
    return <Component {...rest} useOverrides={finalUseOverrides} />;
  };
  return WithAutoSuperscript;
};
