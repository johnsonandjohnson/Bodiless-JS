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

import React, { FC, ComponentType } from 'react';
import { observer } from 'mobx-react-lite';
import Tooltip from 'rc-tooltip';

import { flow } from 'lodash';
import { useEditContext } from '../hooks';
import { useUI } from './PageEditor';
import { TMenuOption } from '../Types/ContextMenuTypes';
import { PageEditContextInterface } from '../PageEditContext/types';

/**
 * @private
 *
 * Purpose of this event handler to control a case when the tooltip shows on a component
 * that became invisible for any reason and the tooltip positioned to the top-left corner
 * of the screen.
 *
 * @param domNode The element to which the popup is attached.
 */
const onPopupAlign = (domNode: Element) => {
  const element = domNode as HTMLElement;
  if (element.getBoundingClientRect().left <= 0) {
    element.style.visibility = 'hidden';
  } else {
    element.style.visibility = 'visible';
  }
};

type LocalOptionsMap = {
  options: Map<string, TMenuOption>,
  groups: Set<string>,
};

// Filters out non-local options and records named groups.
const buildMap = (options$: TMenuOption[]): LocalOptionsMap => {
  const options = new Map<string, TMenuOption>();
  const groups = new Set<string>();
  options$.forEach(op => {
    if (!op.local) return;
    options.set(op.name, op);
    if (op.group) groups.add(op.group);
  });
  return { options, groups };
};

const addDefaultGroups = (map: LocalOptionsMap): LocalOptionsMap => {
  const local = true;
  const Component = 'group';
  const groups = new Set<string>();
  const options = new Map<string, TMenuOption>();
  map.options.forEach(op => {
    let op$: TMenuOption = op;
    // Add a default group for an option only if
    // - The option is not itself a named group, and
    // - The option does not belong to a named group, and
    // - The option has a context to provide a group name and label
    if (!map.groups.has(op.name) && !op.group && op.context) {
      const { context } = op;
      const { id: name, name: label } = context;
      // Add the group property to the option.
      op$ = { ...op, group: name };
      // Create the group option if it does not exist.
      if (!groups.has(name)) {
        groups.add(name);
        options.set(name, {
          name, label, context, local, Component,
        });
      }
    }
    options.set(op$.name, op$);
    if (map.groups.has(op$.name)) groups.add(op$.name);
  });
  return { options, groups };
};

// If a group has a merge property, then merge it with the next group if one exists.
const mergeGroups = (map: LocalOptionsMap): LocalOptionsMap => {
  const groups = new Set<string>(map.groups);
  const options = new Map<string, TMenuOption>(map.options.entries());
  const groupArray = Array.from(map.groups.values());
  groupArray.forEach((group, index) => {
    if (options.get(group)!.groupMerge === 'merge') {
      const next = groupArray[index + 1];
      if (next) {
        const members = Array.from(options.values()).filter(op => op.group === group);
        members.forEach(op => {
          options.set(op.name, { ...op, group: next });
        });
        groups.delete(group);
        options.delete(group);
      }
    } else if (options.get(group)!.groupMerge === 'merge-up' && index > 0) {
      const next = groupArray[index - 1];
      const members = Array.from(options.values()).filter(op => op.group === group);
      members.forEach(op => {
        options.set(op.name, { ...op, group: next });
      });
      groups.delete(group);
      options.delete(group);
    }
  });
  return { options, groups };
};

// Ensure that options for innermost contexts appear first.
const reverseContextOrder = (map: LocalOptionsMap): LocalOptionsMap => {
  // Get list of contexts in reverse order.
  const contexts = new Set<PageEditContextInterface>();
  const groupArray = Array.from(map.groups.values());
  [...groupArray].reverse().forEach(g => {
    const context = map.options.get(g)?.context;
    if (context) contexts.add(context);
  });

  // Create the correclty ordered list of groups.
  const groups = new Set<string>();
  contexts.forEach(c => {
    const cgroups = groupArray.filter(g => map.options.get(g)!.context === c);
    cgroups.forEach(g => groups.add(g));
  });

  // Add any groups without context at the end
  groupArray.filter(g => !map.options.get(g)!.context).forEach(g => groups.add(g));

  // Delete each group option and re-add it in the correct order.
  const options = new Map<string, TMenuOption>(map.options);
  groups.forEach(g => {
    const option = options.get(g)!; // We know there is an option for every group by now.
    options.delete(g);
    options.set(g, option);
  });

  return { options, groups };
};

// Sets the isHidden property of all groups so as to hide groups which have no visible members.
const addHideEmptyGroups = (map: LocalOptionsMap): LocalOptionsMap => {
  type FlowTest = (b: boolean) => boolean;
  const flowIsHidden = (isHidden?: boolean|(() => boolean)): FlowTest => (result: boolean) => (
    (typeof isHidden === 'function' ? isHidden() : Boolean(isHidden)) && result
  );
  const options = new Map(map.options);
  map.groups.forEach(groupName => {
    const group = options.get(groupName);
    const members = Array.from(options.values()).filter(o => o.group === groupName);
    const tests = members.reduce(
      (acc, next) => [...acc, flowIsHidden(next.isHidden)], [] as FlowTest[],
    );
    // Groups are hidden by default
    const isHidden = () => {
      const groupIsHidden = typeof group!.isHidden === 'function'
        ? group!.isHidden() : group!.isHidden;
      // A group which is explicitly hidden should never be shown.
      if (groupIsHidden) return true;
      // Otherwise, group visibility is determined by visibility of its members.
      return flow(...tests)(true);
    };
    options.set(groupName, { ...group!, isHidden });
  });
  return { groups: map.groups, options };
};

const addAriaLabels = (map: LocalOptionsMap): LocalOptionsMap => {
  map.options.forEach((op, name) => {
    if (!map.groups.has(name) && !op.ariaLabel) {
      const groupLabel = op.group && map.options.get(op.group)?.label;
      const { label } = op;
      if (groupLabel && label) {
        const ariaLabel = () => {
          const groupLabel$ = typeof groupLabel === 'function' ? groupLabel() : groupLabel;
          const label$ = typeof label === 'function' ? label() : label;
          return `${label$} ${groupLabel$}`;
        };
        map.options.set(name, { ...op, ariaLabel });
      }
    }
  });
  return map;
};

const useLocalOptions = () => {
  const { contextMenuOptions } = useEditContext();
  const { options } = flow(
    buildMap,
    addDefaultGroups,
    mergeGroups,
    reverseContextOrder,
    addHideEmptyGroups,
    addAriaLabels,
  )(contextMenuOptions);
  return Array.from(options.values());
};

/**
 * @private
 *
 * Renders children inside an rc-tooltip whose overlay contents contain all local menu option icons.
 */
const ContextMenuOverlay = observer<{}>(() => {
  const { LocalContextMenu: Menu } = useUI();
  const options = useLocalOptions();
  return <Menu options={options} />;
});

/*
 * Wraps its children in a tooltip displaying local context menu options, but only if the
 * current context is the innermost context to which a local context menu has been assigned.
 */
const LocalContextMenu: FC = ({ children }) => {
  const context = useEditContext();
  // console.log('render tooltip for', context.name);
  // let the context know it has a localMenu
  context.hasLocalMenu = true;
  const { isInnermostLocalMenu, areLocalTooltipsDisabled } = context;
  // TODO: Only render tooltip when needed. Currently this causes focus issues with editables.
  // (The editable gets the focus, then the tooltip re-renders and creates a new editable
  // which is not focused.  Might be worth investigating this at some point.)
  // if (!isInnermostLocalMenu) {
  //   return <>{children}</>;
  // }
  return (
    <Tooltip
      visible={isInnermostLocalMenu && !areLocalTooltipsDisabled}
      overlay={<ContextMenuOverlay />}
      trigger={[]}
      destroyTooltipOnHide
      placement="bottomLeft"
      onPopupAlign={onPopupAlign}
    >
      {children}
    </Tooltip>
  );
};

export default observer(LocalContextMenu) as ComponentType;
