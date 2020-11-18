import { flow } from 'lodash';
import {
  asSubList, asBodilessList, asEditable, withSimpleSubListDesign,
} from '@bodiless/components';
import {
  withDesign, addClasses, stylable, replaceWith,
} from '@bodiless/fclasses';

export const withSimpleTitle = withDesign({
  Title: flow(
    // @ts-ignore
    replaceWith('span'),
    asEditable('text', 'Item'),
  ),
});

export const withItemMargin = withDesign({
  Item: flow(stylable, addClasses('ml-5')),
});

const withSubLists = withDesign({
  Item: flow(
    asSubList(),
    withDesign({
      Item: asSubList(),
    }),
  ),
});

const withTitles = withDesign({
  Item: flow(
    withSimpleTitle,
    withDesign({
      Item: withSimpleTitle,
    }),
  ),
});

const withMargins = withDesign({
  Item: flow(
    withItemMargin,
    withDesign({
      Item: withItemMargin,
    }),
  ),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BasicCompoundListVerbose = flow(
  asBodilessList(),
  withSimpleTitle,
  withSubLists,
  withTitles,
  withMargins,
)('ul');

const withListDesign = withSimpleSubListDesign(2);
const BasicCompoundList = flow(
  asBodilessList(),
  withSimpleTitle,
  withListDesign(flow(
    asSubList(),
    withSimpleTitle,
    withItemMargin,
  )),
)('ul');

export default BasicCompoundList;
