import React from 'react';
import {
  DefaultContentNode,
  NodeProvider,
  useNode,
} from '@bodiless/core';
import { HOC } from '@bodiless/fclasses';
import { LanguageContentNode } from './LanguageContentNode';
import { useLanguageContext } from '../LanguageProvider';

type NodeProps = {
  nodeKey?: string,
  nodeCollection?: string,
};

export const withLanguageNode: HOC = Component => props => {
  const { nodeKey, nodeCollection }: NodeProps = props as any;
  if (!nodeKey || nodeCollection !== 'site') return <Component {...props} />;
  const { getCurrentLanguage } = useLanguageContext();
  const currentLanguage = getCurrentLanguage();
  if (!currentLanguage || currentLanguage?.isDefault || !currentLanguage.name) {
    return <Component {...props} />;
  }
  const { node } = useNode(nodeCollection);
  const languageNode = LanguageContentNode.create(
    (node as DefaultContentNode<object>),
    currentLanguage.name,
  );
  return (
    <NodeProvider node={languageNode} collection={nodeCollection}>
      <Component {...props} />
    </NodeProvider>
  );
};
