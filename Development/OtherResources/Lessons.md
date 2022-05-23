# Lessons learned and gotchas

## Testing

### Trigger re-render with 'mount'

One reliable way to cause a wrapper to re-render (ie in response to an event) is
to call `setProps()` on it. Note however, you must pass the new prop through to
any subcomponent which you want to re-render.

### Use mount (not shallow) to test context.
You must use mount (not shallow) when trying to test context providers:

```js
import React from 'react';
import { shallow, mount } from 'enzyme';

const context = React.createContext('initial');
const ContextUpdater: React.FC = ({ children }) => (
  <context.Provider value="updated">
    {children}
  </context.Provider>
);
const testUseContext = (isShallow: boolean) => {
  const Test = () => <span>{React.useContext(context)}</span>;
  const wrapper = isShallow
    ? shallow(<ContextUpdater><Test /></ContextUpdater>).find(Test).dive()
    : mount(<ContextUpdater><Test /></ContextUpdater>).find(Test);
  expect(wrapper.find('span').text()).toBe('updated');
};

describe.only('ContextUpdater', () => {
  it('Updates the context on shallow render', () => {
    // This fails.
    testUseContext(true);
  });
  it('Updates the context on mount', () => {
    // This passes.
    testUseContext(false);
  });
});
```
