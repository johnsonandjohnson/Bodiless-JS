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

import { autorun, observable } from 'mobx';
import PageEditContext from '../src/PageEditContext';
import { PageEditContextInterface } from '../src/PageEditContext/types';
import { TMenuOption } from '../src/Types/ContextMenuTypes';

const spawn = (parent: PageEditContextInterface, id: string, type?: string) => (
  parent.spawn({
    id,
    name: id,
    type,
    getMenuOptions: () => [
      {
        name: id,
      },
    ],
  })
);

const createContextTree: () => { [key: string]: PageEditContextInterface } = () => {
  const root = new PageEditContext();
  const parent1 = spawn(root, 'parent1');
  const child11 = spawn(parent1, 'child11');
  const child12 = spawn(parent1, 'child12');
  const parent2 = spawn(root, 'parent2');
  const child21 = spawn(parent2, 'child21');
  return {
    root,
    parent1,
    parent2,
    child11,
    child12,
    child21,
  };
};

describe('PageEditContext', () => {
  it('activates only itself and all ancestors', () => {
    const tree = createContextTree();
    tree.child11.activate();
    expect(tree.root.isActive).toBeTruthy();
    expect(tree.parent1.isActive).toBeTruthy();
    expect(tree.child11.isActive).toBeTruthy();
    expect(tree.child12.isActive).toBeFalsy();
    expect(tree.parent2.isActive).toBeFalsy();
    expect(tree.child21.isActive).toBeFalsy();
    expect(tree.root.isInnermost).toBeFalsy();
    expect(tree.parent1.isInnermost).toBeFalsy();
    expect(tree.child11.isInnermost).toBeTruthy();
    expect(tree.child12.isInnermost).toBeFalsy();
    expect(tree.parent2.isInnermost).toBeFalsy();
    expect(tree.child21.isInnermost).toBeFalsy();
    expect(tree.root.activeDescendants).toEqual([tree.parent1, tree.child11]);
    expect(tree.parent1.activeDescendants).toEqual([tree.child11]);
    expect(tree.child11.activeDescendants).toHaveLength(0);
    expect(tree.child12.activeDescendants).toBeUndefined();
    expect(tree.parent2.activeDescendants).toBeUndefined();
    expect(tree.child21.activeDescendants).toBeUndefined();
  });

  it('sets the correct menu options', () => {
    const tree = createContextTree();
    const expectOptionNamesToBe = (expected: string[]) => {
      // We test getting the menu options from anywhere in the context tree.
      Object.keys(tree).forEach(key => {
        expect(tree[key].contextMenuOptions.length).toBe(expected.length);
        tree[key].contextMenuOptions.forEach((option: any, index: any) => expect(
          option.name,
        ).toBe(expected[index]));
      });
    };
    tree.child21.activate();
    expectOptionNamesToBe([tree.parent2.id, tree.child21.id]);
    tree.child12.activate();
    expectOptionNamesToBe([tree.parent1.id, tree.child12.id]);
    tree.parent1.activate();
    expectOptionNamesToBe([tree.parent1.id]);
  });

  it('toggles edit mode correctly', () => {
    const tree = createContextTree();
    tree.parent1.toggleEdit(true);
    Object.keys(tree).forEach(key => expect(tree[key].isEdit).toBeTruthy());
    tree.parent2.toggleEdit();
    Object.keys(tree).forEach(key => expect(tree[key].isEdit).toBeFalsy());
    tree.root.toggleEdit();
    Object.keys(tree).forEach(key => expect(tree[key].isEdit).toBeTruthy());
    tree.child21.toggleEdit(false);
    Object.keys(tree).forEach(key => expect(tree[key].isEdit).toBeFalsy());
  });
});

describe.skip('mobx', () => {
  it('react on nested map only when properties change', () => {
    const outer = observable.map({});
    const inner = observable.map({});
    const foo = { a: 'b' };
    const bar = { c: 'd' };
    const baz = { c: 'e' };
    inner.set('foo', foo);
    inner.set('bar', bar);
    outer.set('inner', inner);
    const reaction = jest.fn();
    const disposer = autorun(() => {
      outer.get('inner').get('bar');
      reaction();
    });
    expect(reaction).toHaveBeenCalledTimes(1);
    inner.set('bar', baz);
    expect(reaction).toHaveBeenCalledTimes(1);
    disposer();
  });
  it('does not react on nested map', () => {
    const outer = observable.map({});
    // const inner = observable.map({}, { deep: false });
    const inner = observable.map({});
    const foo = { a: 'b' };
    const bar = { c: 'd' };
    const baz = { e: 'f' };
    inner.set('foo', foo);
    inner.set('bar', bar);
    outer.set('inner', inner);
    const reaction = jest.fn();
    const disposer = autorun(() => {
      outer.get('inner').keys();
      reaction();
    });
    expect(reaction).toHaveBeenCalledTimes(1);
    inner.set('bar', baz);
    expect(reaction).toHaveBeenCalledTimes(1);
    disposer();
  });

  it('works as i expect', () => {
    const map = observable.map({}, { deep: false });
    const map1 = observable.map();
    const reaction = jest.fn();
    const disposer = autorun(() => {
      map.get('foo');
      reaction();
    });
    // Reaction triggered once when created
    let times = 1;
    expect(reaction).toHaveBeenCalledTimes(times);
    // Reaction not triggered when another observable is altered
    map1.set('foo', 'bar');
    expect(reaction).toHaveBeenCalledTimes(times);
    // Reaction not triggered when a different element of map is altered
    map.set('baz', 'bing');
    expect(reaction).toHaveBeenCalledTimes(times);
    // Reaction triggered when observed element is created
    times += 1;
    map.set('foo', 'bar');
    expect(reaction).toHaveBeenCalledTimes(times);
    // Reaction not triggered when a different element of map is altered
    map.set('baz', 'bing');
    expect(reaction).toHaveBeenCalledTimes(times);
    // Reaction triggered when observed element is updated
    times += 1;
    const blap = {
      blip: 'blop',
    };
    map.set('foo', blap);
    expect(reaction).toHaveBeenCalledTimes(times);
    // Reaction not triggered when observed element is updated with same value
    const blapple = blap;
    map.set('foo', blapple);
    expect(reaction).toHaveBeenCalledTimes(times);
    // Reaction triggered when observed element is updated with new object with same props
    times += 1;
    const blobble = { ...blap };
    map.set('foo', blobble);
    expect(reaction).toHaveBeenCalledTimes(times);
    disposer();
  });
});

describe('Registering peer contexts', () => {
  let c: PageEditContextInterface;
  let c1: PageEditContextInterface;
  let c2: PageEditContextInterface;

  beforeEach(() => {
    c = new PageEditContext({ id: 'c' });
    c1 = new PageEditContext({ id: 'c1' });
    c2 = new PageEditContext({ id: 'c2' });
    c.registerPeer(c1);
    c.registerPeer(c2);
  });

  it('correctly registers peers', () => {
    const peers = c.peerContexts;
    expect(peers).toHaveLength(2);
    expect(peers[0].id).toBe('c1');
    expect(peers[1].id).toBe('c2');
  });

  it('replaces a registeed peer with the same id', () => {
    const c1a = new PageEditContext({ id: 'c1' });
    c.registerPeer(c1a);
    const peers = c.peerContexts;
    expect(peers).toHaveLength(2);
    expect(peers[0].id).toBe('c1');
    expect(peers[0]).toBe(c1a);
    expect(peers[1].id).toBe('c2');
  });

  it('correctly unregisters a peer', () => {
    c.unregisterPeer(c1);
    expect(c.peerContexts).toHaveLength(1);
    expect(c.peerContexts[0].id).toBe('c2');
  });

  it('preserves insertion order when re-registering', () => {
    c.unregisterPeer(c1);
    c.registerPeer(c1);
    const peers = c.peerContexts;
    expect(peers).toHaveLength(2);
    expect(peers[0].id).toBe('c1');
    expect(peers[1].id).toBe('c2');
  });
});

describe('Update menu options', () => {
  const parentContext = new PageEditContext({
    // Note we need to return a reference to the same object here, or
    // the context menu will re-render even if the options don't change.
    getMenuOptions: () => [{
      name: 'parent',
    }],
    name: 'Parent',
    id: 'Parent',
  });
  const peerContext = new PageEditContext({
    // Note we need to return a reference to the same object here, or
    // the context menu will re-render even if the options don't change.
    getMenuOptions: () => [{
      name: 'peer',
    }],
    name: 'Peer',
    id: 'Peer',
  });

  const createBaseContext = () => {
    let options: TMenuOption[] = [{
      name: 'foo',
      icon: 'foo',
    }];
    const context = new PageEditContext({
      getMenuOptions: () => options,
      name: 'Foo',
      id: 'Foo',
    }, parentContext);
    context.registerPeer(peerContext);
    const createContext = (newOptions: TMenuOption[]) => { options = newOptions; return context; };
    return { context, createContext };
  };

  const { context, createContext } = createBaseContext();

  const optionListener = jest.fn(() => {
    const options = context.contextMenuOptions;
    options.forEach(op => {
      // Access all the properties of the option (which are used by the option button).
      const ref = [];
      Object.keys(op).forEach(key => ref.push(op[key as keyof TMenuOption]));
    });
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let optionDisposer: Function;

  const listener = jest.fn(() => {
    const options = context.contextMenuOptions;
    options.forEach(op => {
      // Access only the group, name and context properties (which are used by the menu itself)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const ref = [op.group, op.name, op.context];
    });
  });
  let disposer: Function;

  const clearListeners = () => {
    listener.mockClear();
    optionListener.mockClear();
  };

  beforeAll(() => {
    disposer = autorun(listener);
    optionDisposer = autorun(optionListener);
    listener.mockClear();
    optionListener.mockClear();
    context.activate();
  });

  afterAll(() => {
    disposer();
    optionDisposer();
  });

  it('Notifies when context is activated for the first time', () => {
    expect(listener).toHaveBeenCalledTimes(1);
    context.activate();
    expect(listener).toHaveBeenCalledTimes(1);
    expect(optionListener).toHaveBeenCalledTimes(1);
  });

  it('Does not notify when context updates with no change', () => {
    clearListeners();
    context.updateMenuOptions();
    expect(listener).toHaveBeenCalledTimes(0);
    expect(optionListener).toHaveBeenCalledTimes(0);
  });

  it('Notifies only the button listener when an option property is changed', () => {
    clearListeners();
    const option = { name: 'foo', icon: 'bar' };
    const newContext = createContext([option]);
    newContext.updateMenuOptions();
    expect(listener).toHaveBeenCalledTimes(0);
    expect(optionListener).toHaveBeenCalledTimes(1);
    expect(newContext.getMenuOptions()[0]).toEqual(option);
  });

  it('Notifies only the button listener when an option property is added', () => {
    clearListeners();
    const option = { name: 'foo', icon: 'foo', label: 'foo' };
    const newContext = createContext([option]);
    newContext.updateMenuOptions();
    expect(listener).toHaveBeenCalledTimes(0);
    expect(optionListener).toHaveBeenCalledTimes(1);
    expect(newContext.getMenuOptions()[0]).toEqual(option);

    const option$ = { name: 'foo', icon: 'foo', label: 'bar' };
    const newContext$ = createContext([option$]);
    newContext$.updateMenuOptions();
    expect(listener).toHaveBeenCalledTimes(0);
    expect(optionListener).toHaveBeenCalledTimes(2);
    expect(newContext$.getMenuOptions()[0]).toEqual(option$);
  });

  it('Notifies only the button listener when an option property is removed', () => {
    clearListeners();
    const option = { name: 'foo' };
    const newContext = createContext([option]);
    newContext.updateMenuOptions();
    expect(listener).toHaveBeenCalledTimes(0);
    expect(optionListener).toHaveBeenCalledTimes(1);
    expect(newContext.getMenuOptions()[0]).toEqual(option);
  });

  it('Notifies when an option is added', () => {
    clearListeners();
    const newOptions = [{ name: 'foo' }, { name: 'new' }];
    const newContext = createContext(newOptions);
    newContext.updateMenuOptions();
    expect(listener).toHaveBeenCalledTimes(1);
    expect(optionListener).toHaveBeenCalledTimes(1);
  });
});
