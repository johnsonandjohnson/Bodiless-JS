import React from 'react';
import { flow, flowRight } from 'lodash';
import {
  List, Editable, asEditableList, withBasicSublist, asTestableList, asEditable,
} from '@bodiless/components';
import {
  withDesign, replaceWith, addClasses, stylable,
  removeClasses,
  A,
} from '@bodiless/fclasses';
import { withNodeKey } from '@bodiless/core';
import { asEditableLink, asLink } from '../../../components/Elements.token';
/**
 * We provide a simple, editable title.
 */
const SimpleTitle = (props: any) => (
  <span {...props}><Editable nodeKey="text" placeholder="Item" /></span>
);
const LinkTitle = flowRight(
  withNodeKey('link'),
  asEditable('text', 'Item'),
  asEditableLink('link'),
  asLink,
)(A);
/**
 * This is an editable list using our simple editable title.
 */
const EditableList = flow(
  asEditableList,
  withDesign({
    Title: replaceWith(SimpleTitle),
    Wrapper: flow(stylable, addClasses('pl-10')),
    Item: flow(stylable, addClasses('text-red')),
  }),
  asTestableList('list'),
)(List);
/**
 * This is an editable list using our simple editable title.
 */
const EditableLinkList = flow(
  asEditableList,
  withDesign({ Title: replaceWith(LinkTitle), Wrapper: flow(stylable, addClasses('pl-10')) }),
  asTestableList('link-list'),
)(List);
/**
 * Reduces the padding of the list.  We apply it to the inner list
 * to demonstrate how to style a particular sublist.
 */
const withLessPadding = withDesign({
  Wrapper: flow(
    addClasses('pl-4'),
    removeClasses('pl-10'),
  ),
});
const InnerList = withLessPadding(EditableList);
const MiddleList = withBasicSublist(InnerList)(EditableList);
export const OuterList = withBasicSublist(MiddleList)(EditableList);
const InnerLinkList = withLessPadding(EditableLinkList);
const MiddleLinkList = withBasicSublist(InnerLinkList)(EditableLinkList);
export const OuterLinkList = withBasicSublist(MiddleLinkList)(EditableLinkList);
