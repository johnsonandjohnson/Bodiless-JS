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

describe('bodiless-core', () => {
  it('needs integration tests', () => {
    expect(1).toBe(1);
  });
});

// import React, { HTMLProps } from 'react';
// import { Form, Text, BasicFormProps } from 'informed';
//
// import {
//   PageEditor,
//   ContextWrapper,
//   LocalContextMenu,
//   asContextMenuForm,
//   ContextProvider,
//   ContextMenu,
// } from '../src';
//
// import { TMenuOptionGetter } from '../src/ContextProvider';
// import { mount } from 'enzyme';
//
// const topOptions = () => [
//   {
//     icon: 'keyboard_arrow_up',
//     name: 'top',
//     isActive: () => true,
//     handler: () => undefined,
//     local: true,
//   },
// ];
//
// type Values = { text: string };
// const LeftForm = asContextMenuForm(
//   (props: BasicFormProps<Values>) => (
//     <Form {...props}>
//       <label htmlFor="left-form-txt">Please enter something:</label>
//       <Text name="text" id="left-form-txt" />
//       <button type="submit">
//         done
//       </button>
//     </Form>
//   ),
//   (values: Values) => alert(values.text),
//   {},
// );
//
// const leftOptions = () => [
//   {
//     icon: 'keyboard_arrow_left',
//     name: 'home',
//     isActive: () => true,
//     handler: () => LeftForm,
//     local: true,
//     global: false,
//   },
// ];
//
// const rightOptions = () => [
//   {
//     icon: 'keyboard_arrow_right',
//     name: 'home',
//     isActive: () => true,
//     handler: () => undefined,
//     local: true,
//   },
// ];
//
// type BoxProps = {
//   getMenuOptions?: TMenuOptionGetter,
//   name: string,
// } & HTMLProps<HTMLDivElement>;
//
// const emptyMenuOptionsGetter: TMenuOptionGetter = () => [];
//
// const Box: React.FC<BoxProps> = ({ getMenuOptions, name, children, className, id }) => (
//   <ContextProvider getMenuOptions={getMenuOptions || emptyMenuOptionsGetter} name={name}>
//     <LocalContextMenu id={`${id}-local-context-menu`}>
//       <ContextWrapper fClass="box" className={className} clickable id={`${id}-div`}>
//         {children}
//       </ContextWrapper>
//     </LocalContextMenu>
//   </ContextProvider>
// );
//
// const BasicTest = () => (
//   <PageEditor menuComponent={ContextMenu}>
//   <Box name="Outer" getMenuOptions={topOptions} className="flex w-3/4 flex-wrap">
//     <div className="w-full">
//       Outer Box
//     </div>
//     <Box getMenuOptions={leftOptions} name="left" className="flex-1">
//       Left Box
//     </Box>
//     <Box getMenuOptions={rightOptions} name="left" className="flex-1">
//       Right Box
//     </Box>
//   </Box>
//   </PageEditor>
// );
//
// describe('bodiless-core', () => {
//   it('renders a test page correctly', () => {
//     const wrapper = mount(<BasicTest />);
//     console.log(wrapper.debug());
//     expect(wrapper).toMatchSnapshot();
//   });
// });
//
