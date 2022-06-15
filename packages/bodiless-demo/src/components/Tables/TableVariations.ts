import {
  addProps, as, on, withDesign, addClassesIf, and, startWith, flowHoc,
} from '@bodiless/fclasses';
import { withNode, withNodeKey } from '@bodiless/core';
import { asBodilessChameleon } from '@bodiless/components';
import {
  asBodilessTable,
  useIsInBody,
  useIsInHead,
  useIsSecondColumn,
  useIsThirdColumn,
  useIsFirstColumn,
} from '@bodiless/table';
import { vitalTable, asTableToken } from '@bodiless/vital-table';
import {
  EditorPlainClean, vitalEditorPlain, RichTextClean, vitalRichText
} from '@bodiless/vital-editors';
import GreenYesIcon from '../../assets/GreenYes';
import RedNoIcon from '../../assets/RedNo';

const DemoStyleTable = asTableToken({
  Meta: flowHoc.meta.term('Type')('Table'),
  Schema: {
    _: asBodilessTable(),
    CellContent: as(withNode, withNodeKey('Cell')),
  },
  Theme: {
    Table: 'mx-auto',
    THead: 'bg-demo-primary-interactive text-white',
    TFoot: 'bg-demo-primary-interactive',
    Cell: addClassesIf(and(useIsInBody, useIsFirstColumn))('text-center'),
  },
  Spacing: {
    Cell: 'p-2',
  },
  Editors: {
    CellContent: as(
      asBodilessChameleon('component', { component: 'Editor' }, () => ({ groupLabel: 'Cell Content', label: 'Type' })),
      withDesign({
        PlainEditor: on(EditorPlainClean)(vitalEditorPlain.Default, addProps({ placeholder: 'Cell' })),
        Yes: startWith(GreenYesIcon),
        No: startWith(RedNoIcon),
        Editor: on(RichTextClean)(vitalRichText.Default, addProps({ placeholder: 'Cell' })),
      }),
    ),
  },
});

const WithHighlightSecondColumn = asTableToken({
  Theme: {
    Cell: as(
      addClassesIf(and(useIsInBody, useIsSecondColumn))('bg-demo-table-light'),
      addClassesIf(and(useIsInHead, useIsSecondColumn))('font-extrabold italic'),
    ),
  },
  Meta: flowHoc.meta.term('Style')('Custom Hightlighted: Second'),
});

const WithHighlightThirdColumn = asTableToken({
  Theme: {
    Cell: as(
      addClassesIf(and(useIsInBody, useIsThirdColumn))('bg-demo-table-light'),
      addClassesIf(and(useIsInHead, useIsThirdColumn))('font-extrabold italic'),
    ),
  },
  Meta: flowHoc.meta.term('Style')('Custom Hightlighted: Third'),
});

const asSecondColumnHighlighted = as(
  DemoStyleTable,
  // vitalTable.WithFlowContainerPreview,
  vitalTable.WithBorders,
  WithHighlightSecondColumn,
);
const asThirdColumnHighlighted = as(
  DemoStyleTable,
  vitalTable.WithFlowContainerPreview,
  vitalTable.WithBorders,
  WithHighlightThirdColumn,
);

export {
  asSecondColumnHighlighted,
  asThirdColumnHighlighted,
};
