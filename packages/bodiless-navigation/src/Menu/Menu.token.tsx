/**
 * Copyright © 2020 Johnson & Johnson
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

import { useEditContext } from '@bodiless/core';
import {
  addClasses,
  removeClassesIf,
  addClassesIf,
  withDesignAt,
  withDesign,
  TokenDef,
  asToken,
} from '@bodiless/fclasses';

import { useIsMenuOpen } from './withMenuContext';
import {
  asFlex, asOverflowHidden, asRelative, asAbsolute,
  asPositionedLeft, withFullWidthStyles, withColumnDirectionStyles,
  withStaticOnHoverStyles, withVisibleOnHoverStyles, asElementToken, asListToken,
} from '../token';

const withSecondLevelDesign = (keys: string[]) => keys.reduce((result, item) => {
  result.push(['Item', item]);
  return result;
}, [] as any[]);

// eslint-disable-next-line no-confusing-arrow
const withThirdLevelDesign = (keys: string[]) => keys.includes('Columns')
  ? [['Item', 'Columns', 'Item', 'SubList']]
  : [];

// @todo think about implementation
const depthDesignPathOptions = [() => [], withSecondLevelDesign, withThirdLevelDesign];

/**
 * Applies a token or design at a particular design path in the menu.
 *
 * @example
 * ```js
 * withMenuDesign('Columns') -- all levels of columns submenu
 * withDesignAt(['Item', 'Columns'], ['Item', 'Columns', 'Item', 'SubList'])
 *
 * withMenuDesign('Columns', 1) -- second level of columns submenu
 * withDesignAt(['Item', 'Columns'])
 *
 * withMenuDesign('Columns', 2) -- second level of columns submenu
 * withDesignAt(['Item', 'Columns', 'Item', 'SubList'])
 *
 * withMenuDesign('Touts') -- all levels of touts submenu
 * withDesignAt(['Item', 'Touts'])
 *
 * withMenuDesign('List') -- all levels of lists submenu
 * withDesignAt(['Item', 'List'])
 *
 * withMenuDesign() -- all levels of all submenus + top menu
 * withDesignAt(
 *   ['Item'],
 *   ['Item', 'List'],
 *   ['Item', 'Touts'],
 *   ['Item', 'Columns'],
 *   ['Item', 'Columns', 'Item', 'SubList'],
 * )
 *
 * withMenuDesign(undefined, 0) -- top level menu only
 * withDesignAt(['Item'])
 *
 * withMenuDesign(undefined, 1) -- all submenus of level 1
 * withDesignAt(['Item', 'List'], ['Item', 'Touts'], ['Item', 'Columns'])

 * withMenuDesign(undefined, 2) -- all submenus of level 2 ( currently columns submenus only )
 * withDesignAt(['Item', 'Columns', 'Item', 'SubList'])
 * ```
 */
export const withMenuDesign = <P extends object>(
  keys: string|string[] = ['Main', 'List', 'Columns', 'Touts'],
  depths: number|number[] = [0, 1, 2],
) => (...tokenDefs: TokenDef<P>[]) => {
    const keys$ = Array.isArray(keys) ? keys : [keys];
    const depths$ = Array.isArray(depths) ? depths : [depths];

    const submenuDesignPaths: any = [];
    depths$
      .filter(d => d < 3 && d > 0)
      .forEach(d => submenuDesignPaths.push(...depthDesignPathOptions[d](keys$.filter(k => k !== 'Main'))));

    if (keys$.includes('Main') && depths$.includes(0)) {
      return asToken(
        ...tokenDefs,
        withDesignAt(...submenuDesignPaths)(asToken(...tokenDefs)),
      );
    }

    return withDesignAt(...submenuDesignPaths)(asToken(...tokenDefs));
  };

/**
 * Helper which makes it easier to target a particular type of submenu.
 *
 * The first parameter is a list of the submenu key(s) to which the token
 * provided as a second argument should be applied.
 * It also accepts the special key 'Main' to apply the design to the top level menu.
 *
 * @param keys List of the submenu key(s) to which the token should be applied.
 * @param tokenDefs List of tokens to be applied to submenu design key(s).
 *
 * @return Desigh token that applies supplied list of tokens to the provided design keys.
 */
// export const withSubMenuToken = <P extends object>(
//   ...keys: string[]
// ) => (...tokenDefs: TokenDef<P>[]) => {
//     const design: Design<any> = keys.reduce((acc, key) => ({
//       ...acc,
//       [key]: asToken(...tokenDefs),
//     }), {});

//     const withSubMenuDesign = withDesign({
//       Item: withDesign(omit(design, 'Main')),
//     });

//     /* eslint-disable dot-notation */
//     return design['Main']
//       ? asToken(design['Main'], withSubMenuDesign)
//       : withSubMenuDesign;
//   };

/*
 * Utility Styles
 * ===========================================
 */
const isContextActive = () => {
  const { isActive, isEdit } = useEditContext();
  return isEdit && isActive;
};

const isContextNotActive = () => {
  const { isActive, isEdit } = useEditContext();
  return isEdit ? !isActive : true;
};

const asVerticalSubMenu = withDesign({
  Wrapper: withColumnDirectionStyles,
});

const asVisibleOnActive = asToken(
  addClassesIf(isContextActive)('overflow-visible'),
  asElementToken('Layout')('Overflow'),
);

const asResponsiveSublist = withDesign({
  Wrapper: asToken(
    addClasses('min-w-full'),
    asElementToken('Sizing')('Min-Width'),
  ),
});

const asStaticOnHover = asToken(
  withStaticOnHoverStyles,
  removeClassesIf(useIsMenuOpen)('hover:static'),
  asElementToken('Layout')('Position'),
);

const asRelativeNotActive = asToken(
  addClassesIf(isContextNotActive)('relative'),
  asElementToken('Layout')('Position'),
);

const asFullWidthSublist = withDesign({
  Wrapper: withFullWidthStyles,
});

const withHoverStyles = withDesign({
  Item: asToken(
    withVisibleOnHoverStyles,
    removeClassesIf(useIsMenuOpen)('hover:overflow-visible'),
    asElementToken('Layout')('Overflow'),
  ),
});

/*
 * Base Menu Styles
 * ===========================================
 */
const withBaseMenuStyles = asToken(
  withHoverStyles,
  withDesign({
    Wrapper: asToken(asFlex, asRelative),
    Item: asOverflowHidden,
  }),
  // @todo Discuss Attr and Category
  asListToken('Menu')('Main'),
);

/*
 * Base Sub Menu Styles
 * ===========================================
 */
const withBaseSubMenuStyles = withDesign({
  Wrapper: asToken(asFlex, asAbsolute, asPositionedLeft),
});

/*
 * List Sub Menu Styles
 * ===========================================
 */
const asListSubMenu = asToken(
  asResponsiveSublist,
  asVerticalSubMenu,
  withBaseSubMenuStyles,
  asVisibleOnActive,
  asRelative,
  asListToken('Submenu')('List'),
);

/*
 * Touts Sub Menu Styles
 * ===========================================
 */
const asToutsSubMenu = asToken(
  asFullWidthSublist,
  asStaticOnHover,
  withBaseSubMenuStyles,
  asRelativeNotActive,
  asListToken('Submenu')('Touts'),
);

/*
 * Columns Sub Menu Styles
 * ===========================================
 */
const asColumnSubMenu = asToken(
  asFullWidthSublist,
  asStaticOnHover,
  withBaseSubMenuStyles,
  asRelativeNotActive,
  asListToken('Submenu')('Columns'),
);

/**
 * Helper which allows specifying which submenu types should have default navigation styling added.
 *
 * @param keys List of the submenu key(s) to which the default menu styles be applied to.
 *
 * @return Token that applies default top navigation styles based on provided keys.
 */
export const asTopNav = (...keys: string[]) => {
  const listSubmenuStyles = keys.indexOf('List') > -1 ? asListSubMenu : asToken();
  const toutsSubmenuStyles = keys.indexOf('Touts') > -1 ? asToutsSubMenu : asToken();
  const columnsSubmenuStyles = keys.indexOf('Columns') > -1 ? asColumnSubMenu : asToken();

  return asToken(
    withMenuDesign('Main')(withBaseMenuStyles),
    withMenuDesign('List')(listSubmenuStyles),
    withMenuDesign('Touts')(toutsSubmenuStyles),
    withMenuDesign('Columns', [0, 1])(columnsSubmenuStyles),
    // withMenuDesign('Columns')(asTest),
  );
};
