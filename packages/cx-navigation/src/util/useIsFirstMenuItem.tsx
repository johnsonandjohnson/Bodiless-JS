import { useNode } from '@bodiless/core';

/**
 * A hook that returns `true` if the menu item is first, `false` otherwise.
 */
const useIsFirstMenuItem = () => {
  const { node } = useNode();
  const { path: nodePath } = node;
  const parentPath = nodePath.slice(0, -1);
  const itemId = nodePath.slice(-1)[0];
  const parentNode = node.peer<{ items: string[] }>(parentPath);
  if (Object.keys(parentNode.data).length < 1) {
    return false;
  }
  const { items } = parentNode.data;
  return (items && items.length > 0 && itemId === items[0]);
};

export default useIsFirstMenuItem;
