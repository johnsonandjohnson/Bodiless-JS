import { useNode } from '@bodiless/core';
import type { LinkData, Props } from './types';

/**
 * hook that determines if the link data is empty
 * the hook validates the data in the current node and in the corresponding prop
 *
 * @param props - link based component props
 * @returns true when link data is empty, otherwise false
 */
const useEmptyLinkToggle = ({ href }: Props) => {
  const { node } = useNode<LinkData>();
  return (href === undefined || href === '#') && node.data.href === undefined;
};

export default useEmptyLinkToggle;
