import { withNode, withNodeKey } from '@bodiless/core';
import { flowRight } from 'lodash';

const asBodilessHelmet = (nodeKey?: string) =>
  flowRight(
    withNodeKey(nodeKey, 'site'),
    withNode,
    withNodeKey(nodeKey, '_default'),
    withNode,
  );

export { asBodilessHelmet };
