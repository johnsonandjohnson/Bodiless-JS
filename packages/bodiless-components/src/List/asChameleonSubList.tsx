import { v1 } from 'uuid';
import { identity, flow } from 'lodash';
import {
  withDesign, HOC, Design, withoutProps,
} from '@bodiless/fclasses';
import { useEditContext, PageEditContextInterface } from '@bodiless/core';
import { useCallback } from 'react';
import {
  useChameleonContext, withChameleonContext,
  withChameleonComponentFormControls, applyChameleon, withChameleonButton,
} from '../Chameleon';

const hasChildSubList = (context: PageEditContextInterface): boolean => {
  const descendants = context.activeDescendants || [];
  // The first child list is the one to which this toggle applies,
  // so we check to see if more than one.
  return descendants.filter(c => c.type === 'sublist-toggle').length > 1;
};

const useChameleonOverrides = () => {
  const context = useEditContext();
  const { isOn } = useChameleonContext();
  return {
    isHidden: useCallback(() => hasChildSubList(context), []),
    icon: isOn ? 'repeat' : 'playlist_add',
    label: 'Sub',
    name: `chameleon-sublist-${v1()}`,
    formTitle: 'Sublist',
  };
};

const useToggleOverrides = () => {
  const { isOn } = useChameleonContext();
  const context = useEditContext();
  return {
    isHidden: useCallback(() => isOn || hasChildSubList(context), [isOn]),
    icon: 'playlist_add',
    label: 'Sub',
    name: `chameleon-sublist-${v1()}`,
    formTitle: 'Sublist',
  };
};

const useOverrides = () => {
  const { selectableComponents } = useChameleonContext();
  return Object.keys(selectableComponents).length > 1
    ? useChameleonOverrides()
    : useToggleOverrides();
};

const asChameleonSubList = flow(
  applyChameleon,
  withoutProps('onSubmit'),
  withChameleonComponentFormControls,
  withChameleonButton(useOverrides),
  withChameleonContext('cham-sublist'),
);

const withSubListDesign$ = (depth: number) => (design: Design<any>, hoc: HOC = identity): HOC => (
  depth === 0 ? identity
    : withDesign({
      Item: flow(
        hoc,
        withDesign(design),
        withDesign(
          Object.keys(design).reduce(
            (acc, key) => ({ ...acc, [key]: withSubListDesign$(depth - 1)(design, hoc) }),
            {},
          ),
        ),
      ),
    }) as HOC
);

const withSubListDesign = (depth: number) => (
  withDesign$: HOC|Design<any>,
  hoc: HOC = identity,
): HOC => (
  typeof withDesign$ === 'function'
    ? withSubListDesign$(depth)({ SubList: withDesign$ }, hoc)
    : withSubListDesign$(depth)(withDesign$, hoc)
);

/**
 * Attaches nested chameleon sublists of arbitrary depth to a list.
 *
 * This returns a function which takes a sublist definition, either as a single HOC or a
 * design.  If a single HOC is provided, the effect is a single sublist type which can
 * be toggled on and off.  If a design is provided, the effect is a set of different
 * sublist types which can be swapped (eg for different bullet styles).
 *
 * @param Depth The number of nested sublists to attach.
 * @return An function accepting a sublist definition and returning an HOC which adds the sublists.
 */
const withSubLists = (depth: number) => (asSubList$: HOC|Design<any>): HOC => (
  withSubListDesign(depth)(asSubList$, asChameleonSubList)
);
export default asChameleonSubList;
export { withSubLists, withSubListDesign };
