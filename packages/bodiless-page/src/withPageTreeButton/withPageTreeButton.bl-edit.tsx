import React, {
  useMemo, FC, useState, useRef, useLayoutEffect,
} from 'react';
import {
  withMenuOptions, ContextMenuFormProps, ContextMenuForm,
} from '@bodiless/core';
import { useNode } from '@bodiless/data';
import { pathsToTree, TreeNode } from './pathsToTree';
import { usePageMenuOptionUI } from '../MenuOptionUI';

export const PAGE_TREE_NODE_KEY = 'Site$_pages';

type FolderTreeProps = {
  data: TreeNode,
};

type FolderTreeNodeProps = {
  test: (data: TreeNode) => boolean,
} & FolderTreeProps;

const isNodeVisible = (data: TreeNode, testVisible: (data: TreeNode) => boolean): boolean => {
  const isVisible = data.children.reduce(
    (acc, next) => acc || isNodeVisible(next, testVisible),
    testVisible(data),
  );
  return isVisible;
};

const FolderTreeNode: FC<FolderTreeNodeProps>= ({ data, test }) => {
  if (!isNodeVisible(data, test)) return null;
  const {
    ComponentFormList, ComponentFormListItem, PageTreeLink,
  } = usePageMenuOptionUI();
  return (
    // @todo should use bl classes
    <ComponentFormListItem>
      <PageTreeLink href={data.url}>{data.name}</PageTreeLink>
      {data.children.length > 0 && (
      <ComponentFormList>
        {data.children.map(c => <FolderTreeNode data={c} test={test} />)}
      </ComponentFormList>
      )}
    </ComponentFormListItem>
  );
};

const FolderTree: FC<FolderTreeProps> = props => {
  const { ComponentFormList } = usePageMenuOptionUI();
  // const ComponentFormList = 'ul';
  const { ComponentFormText } = usePageMenuOptionUI();

  // Track the text in the filter input field
  const [match, setMatch] = useState<string|undefined>();
  const test = (data: TreeNode) => !match || new RegExp(match).test(data.name);

  // Ensure the height of the list div remains constent even when items are filtered
  const [height, setHeight] = useState<number|undefined>();
  const listDivRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    setHeight(listDivRef.current?.offsetHeight);
  });

  return (
    <>
      <ComponentFormText
        onChange={fieldState => {
          setMatch(fieldState.value as string);
        }}
        placeholder="Path..."
        name="match"
        autoFocus
      />
      <ComponentFormList>
        <div
          style={height ? { height } : undefined}
          ref={listDivRef}
        >
          <FolderTreeNode {...props} test={test} />
        </div>
      </ComponentFormList>
    </>
  );
};

export type withPageTreeButtonProps = {
  pages?: string[],
};

const useForm = ({ pages }: withPageTreeButtonProps) => useMemo(() => (
  (props: ContextMenuFormProps) => {
    const { node } = useNode();
    const { data } = node.peer<string[]>(PAGE_TREE_NODE_KEY);
    const finalPages = pages || data;
    const {
      ComponentFormTitle,
      ComponentFormDescription,
    } = usePageMenuOptionUI();
    const tree = pathsToTree(finalPages);
    return (
      <ContextMenuForm {...props} hasSubmit={false}>
        <ComponentFormTitle>Navigate to Page</ComponentFormTitle>
        <ComponentFormDescription>
          <FolderTree
            data={tree}
          />
        </ComponentFormDescription>
      </ContextMenuForm>
    );
  }),
[pages]);
/**
 * Provide a menu Button to show the sitemap as a tree of links.
 *
 * @param children
 * @constructor
 */
const useMenuOptions = (props: withPageTreeButtonProps) => {
  const Form = useForm(props);
  return [{
    name: 'page-tree',
    label: 'Nav',
    icon: 'account_tree',
    handler: () => Form,
  }];
};

/**
 * Adds a page tree navigation button to the global sidebar menu.
 *
 * @example
 * ```
 *
 */
export const withPageTreeButton = withMenuOptions({
  useMenuOptions,
  name: 'Page Tree',
  root: true,
});
