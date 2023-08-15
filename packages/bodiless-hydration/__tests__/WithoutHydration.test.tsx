import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import cheerio from 'cheerio';
import {
  InteractiveComponent,
  RemountingComponent,
  createWithoutHydration,
  RerenderingComponent,
} from './WithoutHydrationTestTools';

// ReactDOMServer.renderToString doesn't seem to serialize correctly on a jsdom environment (which
// is the environment this file runs on), so we need to pre-render the components below to work
// with them. If you make any changes to withoutHydration and the tests below break, updating these
// pre-rendered strings might solve your issue. Run renderToString on a node environment, like in
// the `ServerSideWithoutHydration.test.tsx` file in this folder.
//
// Result of: ReactDOMServer.renderToString(<DryComponent />);
export const dryInteractive = '<div data-no-hydrate="true" id="63a9f0ea7bb98050796b649e85481845" data-reactroot=""><section>This component has<!-- --> not<!-- --> been hydrated.</section></div>';

// Result of: ReactDOMServer.renderToString(
//  <RemountingComponent>
//    <DryComponent />
//  <RemountingComponent />
// );
export const dryInteractiveWithRemounting = '<aside data-reactroot=""><div data-no-hydrate="true" id="63a9f0ea7bb98050796b649e85481845"><section>This component has<!-- --> not<!-- --> been hydrated.</section></div></aside>';

describe('when using withoutHydration', () => {
  describe('at the client side', () => {
    describe('on development', () => {
      const withoutHydration = createWithoutHydration();

      it.each([
        'span', 'div'
      ])('should not place the given component inside a %s wrapper element', (element) => {
        const DryComponent = withoutHydration({
          WrapperElement: element as any
        })(InteractiveComponent);
        const wrapper = mount(<DryComponent />);
        const component = wrapper.find(`${element || 'div'}[data-no-hydrate]`);

        expect(component.exists()).toBe(false);
      });

      it('should render and hydrate the given component', () => {
        const DryComponent = withoutHydration()(InteractiveComponent);
        const wrapper = mount(<DryComponent />);
        const component = wrapper.find(InteractiveComponent);

        expect(component.text()).toBe('This component has been hydrated.');
      });
    });

    const withoutHydration = createWithoutHydration('production');

    describe('on production', () => {
      it.each([
        false, 'span', 'div'
      ])('should place the given component inside a %s wrapper element', (element) => {
        const withoutHydration = createWithoutHydration('production');
        const options = element ? {
          WrapperElement: element as any
        } : {};
        const DryComponent = withoutHydration(options)(InteractiveComponent);
        const wrapper = mount(<DryComponent />);
        const component = wrapper.find(`${element || 'div'}[data-no-hydrate]`);

        expect(component.exists()).toBe(true);
      });

      it('the wrapper element should have display contents style by default', () => {
        const WrapperStyle = {display: 'contents'};
        const withoutHydration = createWithoutHydration('production');

        const DryComponent = withoutHydration()(InteractiveComponent);
        const wrapper = mount(<DryComponent />);
        const component = wrapper.find('div[data-no-hydrate]');

        expect(component.prop('style')).toStrictEqual(WrapperStyle);
      });

      it('the wrapper element should have custom style when provided', () => {
        const WrapperStyle = {margin: 0, padding: 0};
        const withoutHydration = createWithoutHydration('production');

        const DryComponent = withoutHydration({
          WrapperStyle
        })(InteractiveComponent);
        const wrapper = mount(<DryComponent />);
        const component = wrapper.find('div[data-no-hydrate]');

        expect(component.prop('style')).toStrictEqual(WrapperStyle);
      });

      const initializeProductionTest = () => {
        const withoutHydration = createWithoutHydration('production');
        const DryComponent = withoutHydration()(InteractiveComponent);
        const root = document.createElement('div');
        // It's important to append the react root to the body manually, because withoutHydration
        // tries to access its inner component using window.getElementById(). This is only required
        // on production tests.
        document.body.appendChild(root);
        root.innerHTML = dryInteractive;

        return {
          withoutHydration,
          DryComponent,
          root,
        };
      };

      it('should not hydrate the given component', () => {
        const { DryComponent, root } = initializeProductionTest();

        act(() => {
          hydrateRoot(root, <DryComponent />);
        });

        const $ = cheerio.load(root.outerHTML);

        expect($('section').text()).toBe('This component has not been hydrated.');
      });

      it('should keep component structure after remounts', () => {
        const root = document.createElement('div');
        document.body.appendChild(root);
        root.innerHTML = dryInteractiveWithRemounting;

        const withoutHydration = createWithoutHydration('production');
        const DryComponent = withoutHydration()(InteractiveComponent);

        act(() => {
          hydrateRoot(root,
            <RemountingComponent>
              <DryComponent />
            </RemountingComponent>);
        });

        const $ = cheerio.load(root.outerHTML);

        expect($('section').text()).toBe('This component has not been hydrated.');
      });

      it('should keep component content after parent re render before component hydration', () => {
        const withoutHydration = createWithoutHydration('production');
        const DryComponent = withoutHydration({
          WrapperElement: 'div'
        })(InteractiveComponent);
        const root = document.createElement('div');
        document.body.appendChild(root);
        root.innerHTML = dryInteractiveWithRemounting;
        const Component = RerenderingComponent(DryComponent);

        act(() => {
          hydrateRoot(root,
            <Component />);
        });

        const $ = cheerio.load(root.outerHTML);

        expect($('section').text()).toBe('This component has not been hydrated.');
      });

      it('should run onUpdate when provided', () => {
        let receivedProps;
        let receivedElement;

        const onUpdate = jest.fn((props, element) => {
          receivedProps = props;
          receivedElement = element;
        });

        const withoutHydration = createWithoutHydration('production');
        const DryComponent = withoutHydration({ onUpdate })(InteractiveComponent);
        const root = document.createElement('div');
        document.body.appendChild(root);
        root.innerHTML = dryInteractive;

        act(() => {
          hydrateRoot(root, <DryComponent optionalProp="This is an example." />);
        });

        const $ = cheerio.load(root.outerHTML);

        expect(onUpdate).toBeCalled();
        expect(receivedProps).toEqual({ optionalProp: 'This is an example.' });
        expect(receivedElement).toBeInstanceOf(HTMLElement);
        expect((receivedElement as unknown as HTMLElement).outerHTML).toBe(dryInteractive);
        expect($('section').text()).toBe('This component has not been hydrated.');
      });
    });
  });
});
