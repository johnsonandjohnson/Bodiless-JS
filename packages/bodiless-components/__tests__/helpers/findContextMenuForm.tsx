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
