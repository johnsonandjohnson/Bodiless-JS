import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import cheerio from 'cheerio';
import {
  InteractiveComponent,
  RemountingComponent,
  createWithoutHydration,
} from './WithoutHydrationTestTools';

// ReactDOMServer.renderToString doesn't seem to serialize correctly on a jsdom environment (which
// is the environment this file runs on), so we need to pre-render the components below to work
// with them. If you make any changes to withoutHydration and the tests below break, updating these
// pre-rendered strings might solve your issue. Run renderToString on a node environment, like in
// the `ServerSideWithoutHydration.test.tsx` file in this folder.
//
// Result of: ReactDOMServer.renderToString(<DryComponent />);
export const dryInteractive = '<div data-no-hydrate="true" id="b46d9aa67b2042ae283d4153251fe4e5" data-reactroot=""><section>This component has<!-- --> not<!-- --> been hydrated.</section></div>';

// Result of: ReactDOMServer.renderToString(
//  <RemountingComponent>
//    <DryComponent />
//  <RemountingComponent />
// );
export const dryInteractiveWithRemounting = '<aside data-reactroot=""><div data-no-hydrate="true" id="root-"><section>This component has<!-- --> not<!-- --> been hydrated.</section></div></aside>';

describe('when using withoutHydration', () => {
  it.each([
    undefined, 'span', 'div'
  ])('should place the given component inside a %s wrapper element', (element) => {
    const withoutHydration = createWithoutHydration();
    const DryComponent = withoutHydration({
      WrapperElement: element as any
    })(InteractiveComponent);
    const wrapper = mount(<DryComponent />);
    const component = wrapper.find(`${element || 'div'}[data-no-hydrate]`);

    expect(component.exists()).toBe(true);
  });

  describe('at the client side', () => {
    describe('on development', () => {
      const withoutHydration = createWithoutHydration();

      it('should render and hydrate the given component', () => {
        const DryComponent = withoutHydration()(InteractiveComponent);
        const wrapper = mount(<DryComponent />);
        const component = wrapper.find(InteractiveComponent);

        expect(component.text()).toBe('This component has been hydrated.');
      });
    });

    describe('on production', () => {
      const withoutHydration = createWithoutHydration('production');

      const initializeProductionTest = () => {
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
          ReactDOM.hydrate(<DryComponent />, root);
        });

        const $ = cheerio.load(root.outerHTML);

        expect($('section').text()).toBe('This component has not been hydrated.');
      });

      it('should keep component structure after remounts', () => {
        const DryComponent = withoutHydration()(InteractiveComponent);
        const root = document.createElement('div');
        document.body.appendChild(root);
        root.innerHTML = dryInteractiveWithRemounting;

        act(() => {
          ReactDOM.hydrate(
            <RemountingComponent>
              <DryComponent />
            </RemountingComponent>,
            root
          );
        });

        const $ = cheerio.load(root.outerHTML);

        expect($('section').text()).toBe('This component has not been hydrated.');
      });

      it('should hydrate when using forceHydration', () => {
        const { DryComponent, root } = initializeProductionTest();

        act(() => {
          ReactDOM.hydrate(<DryComponent forceHydration />, root);
        });

        const $ = cheerio.load(root.outerHTML);

        expect($('section').text()).toBe('This component has been hydrated.');
      });

      it('should run onUpdate when provided', () => {
        let receivedProps;
        let receivedElement;

        const onUpdate = jest.fn((props, element) => {
          receivedProps = props;
          receivedElement = element;
        });

        const DryComponent = withoutHydration({ onUpdate })(InteractiveComponent);
        const root = document.createElement('div');
        document.body.appendChild(root);
        root.innerHTML = dryInteractive;

        act(() => {
          ReactDOM.hydrate(<DryComponent optionalProp="This is an example." />, root);
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
