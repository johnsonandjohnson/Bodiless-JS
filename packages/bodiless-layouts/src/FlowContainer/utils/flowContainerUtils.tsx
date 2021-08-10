import React from 'react';
import { Hr } from '@bodiless/fclasses';
import { FlowContainerItem } from '../types';

/**
 * getBreakTag provides HTML markup for non-visible HR element in case
 * the given flow container component is enabled to break rows.
 *
 * @param item Flow container item
 *
 * @returns Non-visible HR Tag or, if break is disabled, empty string
 */
export const getBreakTag = (item: FlowContainerItem) => {
  const className = 'w-full border-transparent border-0';
  return (item.break) ? <Hr className={className} /> : '';
};

export default {
  getBreakTag,
};
