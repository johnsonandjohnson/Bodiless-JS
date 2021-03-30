import React, { FC } from 'react';
import { DesignableComponents, designable } from '@bodiless/fclasses';

type TokenPrinterProps = {
  designKey?: string;
  tokens?: string[];
  components?: DesignableComponents;
  depth?: number;
};
const indent = (depth: number) => '  '.repeat(depth);
const TokenPrinter: FC<TokenPrinterProps> = props => {
  const {
    designKey,
    tokens = [],
    components = {},
    depth = 0,
  } = props;
  const keyText = designKey ? `${designKey}: ` : '';
  const header = `${indent(depth)}${keyText}asToken(\n`;
  const footer = `${indent(depth)})${depth ? ',' : ';'}\n`;
  const rows = tokens.map(s => `${indent(depth + 1)}${s},\n`);
  const designRows = Object.keys(components).map(key => {
    const C = components[key];
    return <C designKey={key} depth={depth + 2} />;
  }).filter(Boolean);
  if (!rows.length && !designRows.length) return null;
  const designHeader = designRows.length > 0
    ? `${indent(depth + 1)}withDesign({\n` : null;
  const designFooter = designRows.length > 0
    ? `${indent(depth + 1)}}),\n` : null;

  return (
    <>
      {header}
      {rows}
      {designHeader}
      {designRows}
      {designFooter}
      {footer}
    </>
  );
};

export const withTokenPrinterKeys = (keys: string[]) => {
  const startComponents = keys.reduce((acc, key) => ({
    ...acc,
    [key]: TokenPrinter,
  }), {});
  return designable(startComponents);
};

export default TokenPrinter;
