/**
 * Copyright © 2021 Johnson & Johnson
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
import { mount, ReactWrapper } from 'enzyme';
import { PageContextProvider } from '@bodiless/core';

/**
 * Finds and renders the context menu form for the first menu option provided by
 * the first PageContextProvider in the wrapper.
 *
 * @param wrapper The wrapper to search for a PageContextProvider
 *
 * @return A wrapper containing the rendered context menu form
 */
const findContextMenuForm = (wrapper: ReactWrapper) => {
  const { handler } = wrapper.find(PageContextProvider)!.prop('getMenuOptions')!()[0];
  // @ts-ignore handler expects an event but we don't use it.
  const renderForm = handler();
  const Form = () => renderForm();
  const formWrapper = mount(<Form />);
  return formWrapper.childAt(0);
};

export default findContextMenuForm;
