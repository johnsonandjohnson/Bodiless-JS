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

import React, {
  FC, useState, ComponentType, useCallback, createContext, useContext,
} from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  addClasses, H1 as H1$, H2 as H2$, withDesign,
  addProps, Div, removeClasses, HOC, replaceWith, withoutProps,
  Section,
  P,
} from '@bodiless/fclasses';
import { flow } from 'lodash';
import { observer } from 'mobx-react-lite';

import {
  asBodilessChameleon, withChameleonContext, withChameleonButton,
  applyChameleon,
  useChameleonContext,
  withChameleonComponentFormControls,
} from '@bodiless/components';

import {
  useMenuOptionUI, asBodilessComponent, useEditContext,
} from '@bodiless/core';
import { asHeader1, asHeader2 } from '../../../components/Elements.token';
import Layout from '../../../components/Layout';

/*
 * Basic Chaemelion
 */

const BaseComponent = addClasses('border-8 py-5 text-center')(Div);

const basicChameleonDesign = {
  Red: addClasses('border-red-500 text-red-500'),
  Blue: addClasses('border-blue-500 text-blue-500'),
  Green: addClasses('border-green-500 text-green-500'),
};

const BasicChameleon = flow(
  asBodilessChameleon('basic-chameleon') as HOC,
  withDesign(basicChameleonDesign) as HOC,
)(BaseComponent);

/*
 * Basic Toggle
 */
type AvailabilityProps = { isAvailable?: boolean };

const BaseAvailability: FC<AvailabilityProps> = ({ isAvailable, ...rest }) => (
  <Div {...rest}>
    {isAvailable ? 'Available Now!' : 'Call for Availability'}
  </Div>
);

const toggleDesign = {
  Available: flow(
    addProps({ isAvailable: true }),
  ),
};

const AvailabilityToggle = flow(
  asBodilessChameleon('basic-toggle', { component: 'Available' }, () => ({ label: 'Avail' })),
  withDesign(toggleDesign),
  withDesign({
    _default: addClasses('text-red-500'),
  }),
)(BaseAvailability);

/*
 * Compound Toggle
 */

const toggleVisibilityDesign = {
  Available: removeClasses('invisible'),
};

const VisibilityToggle = flow(
  addClasses('invisible') as HOC,
  applyChameleon as HOC,
  withDesign(toggleVisibilityDesign) as HOC,
)(BaseAvailability);

const VisibilityTogglerapper = flow(
  withChameleonButton(() => ({ label: 'Avail' })) as HOC,
  withChameleonContext('decomposed-toggle') as HOC,
  withDesign(toggleVisibilityDesign) as HOC,
)(BaseComponent);

/*
 * Component form toggle
 */

type AddToCartProps = { productId?: string };
const AddToCartBase = observer(({ productId, ...rest }: AddToCartProps) => {
  const { isEdit } = useEditContext();
  const onClick = useCallback(() => {
    // @TODO: Wire this to your cart provider...
    // eslint-disable-next-line no-alert
    alert(`${productId} added to cart`);
  }, [productId]);
  return (
    <div {...rest}>
      <button type="button" onClick={isEdit ? onClick : undefined}>Add to cart</button>
    </div>
  );
});

const addToCartButtonOptions = {
  icon: 'shopping_cart',
  name: 'enable-add-to-cart',
  label: () => (useChameleonContext().isOn ? 'Config' : 'Enable'),
  groupLabel: 'Add to Cart',
  global: false,
  local: true,
  renderForm: ({ componentProps }: any) => {
    const {
      ComponentFormTitle, ComponentFormLabel, ComponentFormText, ComponentFormUnwrapButton,
    } = useMenuOptionUI();
    const { unwrap } = componentProps;
    return (
      <>
        <ComponentFormTitle>Add-to-Cart Configuration</ComponentFormTitle>
        <ComponentFormLabel>
          Product ID
          <ComponentFormText field="productId" />
        </ComponentFormLabel>
        {unwrap && (
          <ComponentFormUnwrapButton onClick={unwrap}>
            Disable Add-to-Cart
          </ComponentFormUnwrapButton>
        )}
      </>
    );
  },
};

const asAddToCart = asBodilessComponent(addToCartButtonOptions);

const toggleCartDesign = {
  Available: replaceWith(AddToCartBase),
};

const AddToCartToggle = flow(
  withoutProps('productId'),
  applyChameleon,
  withoutProps('unwrap'),
  asAddToCart('product-id'),
  withChameleonComponentFormControls,
  withChameleonContext('add-to-cart'),
  withDesign(toggleCartDesign),
)(Div);

const AvailabilityAccordion = ({ isAvailable, ...rest }: any) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Div {...rest}>
      <div>
        <button type="button" onClick={() => setExpanded(e => !e)}>
          {expanded ? <>&#9660;</> : <>&#9658;</>}
          Availability
        </button>
      </div>
      <div className={expanded ? '' : 'hidden'}>
        {isAvailable ? 'In Stock!' : 'Call'}
        a
      </div>
    </Div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AvailabilityAccordionToggleDefective = flow(
  asBodilessChameleon('basic-toggle', { component: 'Available' }, () => ({ label: 'Avail' })),
  withDesign(toggleDesign),
)(AvailabilityAccordion);

const withChameleonAvailability = <P extends object>(Component: ComponentType<P>) => (props: P) => (
  <Component {...props} isAvailable={useChameleonContext().isOn} />
);

const AvailabilityAccordionToggle = flow(
  withChameleonAvailability,
  withChameleonButton(() => ({ label: 'Avail' })) as HOC,
  withChameleonContext('accordion-toggle'),
  withDesign(toggleDesign),
)(AvailabilityAccordion);

const LayoutContext = createContext<string|undefined>(undefined);
const Example: FC = ({ children }) => {
  const widthClass = useContext(LayoutContext) || 'w-1/3';
  const className = `${widthClass} p-5`;
  return (
    <Section className={className}>
      {children}
    </Section>
  );
};
const ExampleLayoutProvider = flow(
  asBodilessChameleon('layout', undefined, () => ({
    root: true,
    label: 'Layout',
    icon: 'grid_view',
    group: 'page-group',
    formTitle: 'Choose a layout for this page',
  })),
  withDesign({
    _default: addProps({ value: 'w-1/3' }),
    'One-Third Width Examples': addProps({ value: 'w-1/3' }),
    'One-Half Width Items': addProps({ value: 'w-1/2' }),
    'Full Width Items': addProps({ value: 'w-full' }),
  }),
)(LayoutContext.Provider);

const H1 = flow(addClasses('pt-5'), asHeader1)(H1$);
const H2 = flow(addClasses('pt-5'), asHeader2)(H2$);
const Description = addClasses('mt-2 text-sm italic')(P);
// const Example = addClasses('w-1/3 p-5')(Section$);
const Examples = addClasses('flex flex-wrap')(Div);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <H1>Chameleon</H1>
      <p>
        The examples below show different uses of the Bodiess &quot;Chameleon&quot;
        component.
        Note: the layout of this whole page is also a chameleon! You can select
        different layouts by clicking the &quot;Page&quot; button on the toolbar
        and then clicking the &quot;Layout&quot; button from the submenu.
      </p>
      <ExampleLayoutProvider>
        <Examples>
          <Example>
            <H2>Basic</H2>
            <BasicChameleon>
              <div>Chameleons!</div>
              <div>Available Now!</div>
            </BasicChameleon>
            <Description>
              Click anywhere inside the box while in edit mode to reveal a local
              context menu button which displays a form to choose a color for the box.
            </Description>
          </Example>
          <Example>
            <H2>Toggle</H2>
            <BaseComponent>
              <div>Chameleons!</div>
              <AvailabilityToggle />
            </BaseComponent>
            <Description>
              Click on the availability text while in edit mode to bring up
              a toggle button which switches between &quot;Available Now!&quot; and
              &quot;Call for Availability&quot;.
            </Description>
          </Example>
          <Example>
            <H2>Accordion Toggle</H2>
            <BaseComponent>
              <div>Chameleons!</div>
              <AvailabilityAccordionToggle />
            </BaseComponent>
            <Description>
              Here the availability status is behind an accordion.  Click on the
              &quot;Availability&quot; text to open and close the accordion. In
              edit mode this will also display a toggle button which allows you
              to switch between &quot;In Stock&quot; and &quot;Call&quot;. Note
              that the accordion state is preserved as you toggle back and forth.
            </Description>
          </Example>
          <Example>
            <H2>Visibility Toggle</H2>
            <VisibilityTogglerapper>
              <div>Chameleons!</div>
              <VisibilityToggle isAvailable />
            </VisibilityTogglerapper>
            <Description>
              This verson shows and hides &quot;Available Now&quot; based on the
              state of the toggle.  You can click anywhere on the box to display
              the toggle button.
            </Description>
          </Example>
          <Example>
            <H2>Component Form Toggle</H2>
            <BaseComponent>
              Chameleons!
              <AddToCartToggle>Call for availability</AddToCartToggle>
            </BaseComponent>
            <Description>
              Here, instead of toggling an availability message, you can toggle
              an &quot;Add to cart&quot; button. The button requires configuration (a product ID).
              Click on the text to bring up a button which adds the button if it not
              present, or edits the configuration if it is. The button can be removed
              by clicking &quot;Disable&quot; in the lower left corner of the
              configuration form.
            </Description>
          </Example>
        </Examples>
      </ExampleLayoutProvider>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
    ...DefaultContentQuery
  }
`;
