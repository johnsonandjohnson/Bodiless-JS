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

import React, { useContext, useState } from 'react';
import { graphql } from 'gatsby';
import { flow } from 'lodash';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  Button as BaseButton,
  addClassesIf,
  addClasses,
  H3,
} from '@bodiless/fclasses';
import Layout from '../../../../components/Layout';
import { asHeader3 } from '../../../../components/Elements.token';

const ToggleContext = React.createContext({
  state: false,
  toggle: () => {},
});

const ToggleProvider = ({ children }) => {
  const [state, setState] = useState(false);
  const contextValue = {
    state,
    toggle: () => setState(!state),
  };
  return (
    <ToggleContext.Provider value={contextValue}>
      {children}
    </ToggleContext.Provider>
  );
};

const useStateContext = () => useContext(ToggleContext);

const isToggled = () => useStateContext().state;

const Button = props => {
  const { toggle } = useStateContext();
  return <BaseButton {...props} onClick={toggle} />;
};

const StyledButton = flow(
  addClassesIf(isToggled)('bg-green-200'),
  addClasses('border p-2 my-2'),
)(Button);

const SubTitle = asHeader3(H3);

export default props => (
  <Page {...props}>
    <Layout>
      <SubTitle>Adding classes to a component conditionally</SubTitle>
      <ToggleProvider>
        <StyledButton>Click to change color</StyledButton>
      </ToggleProvider>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
