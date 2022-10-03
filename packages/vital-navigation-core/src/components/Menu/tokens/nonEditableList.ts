// items from bodiless/navigation copied here...

import flow from 'lodash/flow';
import {
  HOC,
  Design,
  withDesign,
  startWith,
  withDesignAt,
  HOCDef,
  flowHoc,
} from '@bodiless/fclasses';
import {
  asStylableSubList, asSubList, asBodilessList, asStylableList,
} from '@bodiless/components';

import {
  WithNodeKeyProps,
} from '@bodiless/core';

import type { UseListOverrides, ListData } from '@bodiless/components';
import { MenuTitleClean } from '../../MenuTitle';

export const asMenuSubList = (
  withTitleDesign: HOC | HOC,
  useOverrides: UseListOverrides = () => ({}),
) => flow(
  asSubList((props) => ({ groupLabel: 'Sub-Menu Item', ...useOverrides(props) })),
  asStylableSubList,
  withDesign({
    Title: withTitleDesign,
  }),
);

export const withSubMenuDesign = (design: Design<any>) => withDesign({
  Item: withDesign(design),
});

/**
 * Helper which can be used to add a List submenu option to the menu.
 *
 * @param withTitleDesign optional token which will be applied to the sublist title.
 *
 */
export const withListSubMenu = (withTitleDesign?: HOC | HOC) => withSubMenuDesign({
  List: asMenuSubList(
    flowHoc(startWith(MenuTitleClean), withTitleDesign),
  ),
});

const withSecondLevelDesign = (keys: string[]) => keys.reduce((result, item) => {
  result.push(['Item', item]);
  return result;
}, [] as any[]);

const withThirdLevelDesign = (keys: string[]) => (keys.includes('Columns')
  ? [['Item', 'Columns', 'Item', 'SubList']]
  : []);

// @todo think about implementation
const depthDesignPathOptions = [() => [], withSecondLevelDesign, withThirdLevelDesign];

/**
 * Helper which makes it easier to target a particular type of submenu.
 *
 * The first parameter is a list of the submenu key(s) and the second param is the design keys depth
 * to which the tokens provided as a second argument should be applied.
 * It also accepts the special key 'Main' to apply the design to the top level menu.
 *
 * @example
 * ```js
 * withMenuDesign('Columns') -- Applies tokens to all levels of columns submenu.
 * withMenuDesign('Columns', 1) -- Applies tokens to only the first level of Columns submenu.
 * withMenuDesign('Columns', 2) -- Applies tokens to only the second level of Columns submenu.
 *
 * withMenuDesign('Main') -- Applies tokens to the Top menu.
 * withMenuDesign('Cards') -- Applies tokens to Cards submenu.
 * withMenuDesign('List') -- Applies tokens to List submenu.
 *
 * withMenuDesign() -- Applies tokens to the Top menu and all submenus.
 * withMenuDesign(undefined, 0) -- Applies tokens to the Top menu.
 * withMenuDesign(undefined, 1) -- Applies tokens to all submenus of level 1.
 * withMenuDesign(undefined, 2) -- Applies tokens to all submenus of level 2.
 * ```
 *
 * @param keys List of the submenu key(s) to which the token should be applied.
 * @param depths List of menu depth to which the token should be applied to.
 * @param tokenDefs List of tokens to be applied to submenu design key(s).
 *
 * @return Design token that applies supplied list of tokens to the provided design keys.
 */
export const withMenuDesign = (
  keys: string|string[] = ['Main', 'List', 'Columns', 'Cards'],
  depths: number|number[] = [0, 1, 2],
) => (...tokenDefs: HOCDef[]): HOC => {
  const keys$ = Array.isArray(keys) ? keys : [keys];
  const depths$ = Array.isArray(depths) ? depths : [depths];

  const submenuDesignPaths: any = [];
  depths$
    .filter(d => d < 3 && d > 0)
    .forEach(
      d => submenuDesignPaths.push(
        ...depthDesignPathOptions[d](keys$.filter(k => k !== 'Main')),
      ),
    );

  // Make sure depths take precedence.
  // For example withMenuDesign(Main, 1) will not do anything.
  if (keys$.includes('Main') && depths$.includes(0)) {
    return flowHoc(
      {},
      ...tokenDefs,
      withDesignAt(...submenuDesignPaths)(flowHoc({}, ...tokenDefs)),
    );
  }

  return withDesignAt(...submenuDesignPaths)(flowHoc({}, ...tokenDefs));
};

export const asBodilessMenu = <P extends object>(
  nodeKeys?: WithNodeKeyProps,
  defaultData?: ListData,
  useOverrides: UseListOverrides<P> = () => ({}),
) => flowHoc(
    asBodilessList(
      nodeKeys,
      defaultData,
      (props: P) => ({ groupLabel: 'Main Menu Item', ...useOverrides(props) }),
    ),
    asStylableList,
    withDesign({ Title: startWith(MenuTitleClean), }),

  );
