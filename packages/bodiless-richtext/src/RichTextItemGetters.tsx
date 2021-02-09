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

import React, { useRef, ComponentType } from 'react';
import { Editor } from 'slate';
import type { Range } from 'slate';
import {
  NodeProvider, DefaultContentNode, withoutProps, useNode,
} from '@bodiless/core';
import { useSlate } from 'slate-react';
import { flow } from 'lodash';
import {
  createBlockButton,
  createInlineButton,
  createMarkButton,
  createElementRenderPlugin,
  createLeafRenderPlugin,
  hasBlock,
  hasInline,
  hasMark,
  insertBlock,
  toggleBlock,
  toggleInline,
  toggleMark,
  withToggle,
  updateInline,
} from './plugin-factory';
import {
  RichTextItemType,
  RichTextComponents,
  RichTextComponent,
  RenderElementProps,
} from './Type';
import { useUI } from './RichTextContext';

const SlateComponentProvider = (update: Function, type: string) => (
  <P extends object, D extends object>(Component:ComponentType<P & RenderElementProps>) => (
    (props: P & RenderElementProps) => {
      const { element } = props;
      const { node: bodilessNode } = useNode();
      const editor = useSlate();
      const { selection } = editor;
      // when the editor looses focus and selection becomes null
      // see https://github.com/ianstormtaylor/slate/issues/3412
      const lastSelection = useRef<Range | null>(null);
      if (selection !== null) lastSelection.current = selection;
      const getters = {
        getNode: (path: string[]) => (element.data as any)[path.join('$')],
        getKeys: () => ['slatenode'],
        hasError: () => bodilessNode.hasError(),
        getPagePath: () => bodilessNode.pagePath,
        getBaseResourcePath: () => bodilessNode.baseResourcePath,
      };
      const actions = {
        setNode: (path: string[], componentData: any) => {
          const newData = {
            ...element.data as any,
            [path.join('$')]: { ...componentData },
          };
          return update({
            editor,
            type,
            data: newData,
            at: lastSelection.current,
          });
        },
        deleteNode: () => {},
      };
      const contentNode = new DefaultContentNode(actions, getters, 'slatenode');
      return (
        <NodeProvider node={contentNode}>
          <Component {...props} />
        </NodeProvider>
      );
    }
  )
);

/*
  getPlugin will use the data passed in build a slate Plugin that can be passed to a slate editor.
*/
type RenderPluginComponent = ComponentType<any> & {
  type: RichTextItemType,
  id: string,
  isVoid?: boolean,
};
const getRenderPlugin = <P extends object> (Component: RenderPluginComponent) => {
  const {
    type,
    id,
    isVoid,
  } = Component;
  const { creates, WrappedComponent } = {
    [RichTextItemType.block]: {
      creates: createElementRenderPlugin,
      WrappedComponent: Component,
    },
    [RichTextItemType.inline]: {
      creates: createElementRenderPlugin,
      WrappedComponent: SlateComponentProvider(updateInline, id)(Component),
    },
    [RichTextItemType.mark]: {
      creates: createLeafRenderPlugin,
      WrappedComponent: Component,
    },
  }[type];
  // Clean up th component to add Attributes and remove unused props.
  const CleanComponent = flow(
    withoutProps(['isFocused', 'isSelected']),
    // Remove Children if Void Component.
    withoutProps(isVoid ? ['children'] : []),
  )(WrappedComponent as ComponentType<P>);
  return creates({
    Component: CleanComponent,
    type: id,
  });
};

/*
  getPlugins takes an array of data items and pass them though to getPlugin
*/
const getPlugins = (components: RichTextComponents) => [
  ...Object.values(components).map(Component => (
    getRenderPlugin(Component)
  )),
];
/*
  get HoverButton takes a Item and convert it
*/
type HoverButton = RichTextComponent & {
  hoverButton: {
    icon: string,
  };
};
const getHoverButton = <P extends object> (Component: HoverButton) => {
  const creates = {
    [RichTextItemType.block]: createBlockButton,
    [RichTextItemType.inline]: createInlineButton,
    [RichTextItemType.mark]: createMarkButton,
  };
  return creates[Component.type](Component.id, Component.hoverButton.icon);
};

/*
  getHoverButtons takes a array of Rich Text Items and maps that to a set of Hover Buttons
*/
const getHoverButtons = (Components: RichTextComponents) => Object.values(Components)
  // eslint-disable-next-line no-prototype-builtins
  .filter(Component => Component.hoverButton)
  .map(Component => getHoverButton(Component as HoverButton));

type RichTextComponentWithGlobalButton = RichTextComponent & {
  globalButton: { icon: string },
};
const getGlobalButton = (Component: RichTextComponentWithGlobalButton) => (editor: Editor) => ({
  icon: Component.globalButton.icon,
  name: Component.id,
  global: true,
  isActive: () => hasBlock(Component.id, editor),
  handler: () => {
    const options = {
      editor,
      blockType: Component.id,
      value: editor.value,
    };
    if (Component.isAtomicBlock) {
      insertBlock(options);
    } else {
      toggleBlock(options);
    }
  },
});

type getSelectorButtonToggleType = {
  editor: Editor,
  name: string,
};
type getSelectorButtonToggleMarkType = {
  editor: Editor,
  name: string,
};
/*
  getSelectorButton takes a Rich Text Item and returns a button used in the RichText Selector
*/
const getSelectorButton = <P extends object> (Component: RichTextComponent) => (props:P) => {
  const { toggleFuc, has } = {
    [RichTextItemType.block]: {
      toggleFuc: ({ editor, name }: getSelectorButtonToggleType) => (
        toggleBlock({ editor, blockType: name })
      ),
      has: hasBlock,
    },
    [RichTextItemType.inline]: {
      toggleFuc: ({ editor, name }: getSelectorButtonToggleType) => (
        toggleInline({ editor, inlineType: name })
      ),
      has: hasInline,
    },
    [RichTextItemType.mark]: {
      toggleFuc: ({ editor, name }:getSelectorButtonToggleMarkType) => (
        toggleMark({ editor, markType: name })
      ),
      has: hasMark,
    },
  }[Component.type];
  const { ClickableWrapper } = useUI();
  const Button = flow(
    withToggle({
      toggle: ({ editor }) => {
        toggleFuc({ editor, name: Component.id });
      },
      isActive: (editor) => has(Component.id, editor),
      icon: 'none',
    }),
    withoutProps(['componentName']),
  )(ClickableWrapper);
  return <Button><Component {...props}>{ Component.id }</Component></Button>;
};

const getInlineButtons = (components: RichTextComponents) => Object.values(components)
  .filter(Component => Component.type === RichTextItemType.inline);

/*
  getSelectorButtons takes an array of RichTextitems and maps that to a array of buttons
  used in the Rich Text selector
*/
const getSelectorButtons = (components: RichTextComponents) => Object.values(components)
  .filter(Component => Component.type !== RichTextItemType.block)
  // eslint-disable-next-line no-prototype-builtins
  .filter(Component => !Component.hasOwnProperty('hoverButton'))
  .map(Component => getSelectorButton(Component));
/*
  getGlobalButtons takes an array of RichTextitems and maps that to a array of objects used
  to create global buttons
*/
const getGlobalButtons = (components: RichTextComponents) => {
  const componentsWithButtons = Object.values(components)
    // eslint-disable-next-line no-prototype-builtins
    .filter(Component => Component.hasOwnProperty('globalButton'));
  if (!componentsWithButtons.length) return undefined;
  return (
    (editor:Editor) => componentsWithButtons.map(
      Component => getGlobalButton(Component as RichTextComponentWithGlobalButton)(editor),
    )
  );
};

const getDeserializers = (
  components: RichTextComponents,
) => Object.keys(components).reduce((prev: object, key: string) => {
  const Component = components[key];
  return {
    ...prev,
    // eslint-disable-next-line no-prototype-builtins
    ...(Component.hasOwnProperty('htmlDeserializer') ? { [key]: Component.htmlDeserializer } : {}),
  };
}, {});

export {
  getPlugins,
  getSelectorButtons,
  getHoverButtons,
  getGlobalButtons,
  getInlineButtons,
  getDeserializers,
};
