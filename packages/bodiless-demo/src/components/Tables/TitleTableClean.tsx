import React from 'react';
import type { ComponentOrTag } from '@bodiless/fclasses';
import {
  designable,
  Div,
  DesignableComponentsProps,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { EditorPlainClean } from '@bodiless/vital-editors';
import { TableClean } from '@bodiless/vital-table';
import { withoutHydration } from '@bodiless/hydration';

export type TitleTableComponents = {
  Wrapper: ComponentOrTag<any>,
  TitleWrapper: ComponentOrTag<any>,
  Title: ComponentOrTag<any>,
  Table: ComponentOrTag<any>,
};

const TitleTableComponents:TitleTableComponents = {
  Wrapper: Div,
  TitleWrapper: Div,
  Title: EditorPlainClean,
  Table: TableClean,
};

type Props = DesignableComponentsProps<TitleTableComponents> & { };

const TitleTableBase = (props: Props) => {
  const { components: C } = props;

  return (
    <C.Wrapper>
      <C.TitleWrapper>
        <C.Title />
      </C.TitleWrapper>
      <C.Table />
    </C.Wrapper>
  );
};

const TitleTableClean = designable(TitleTableComponents, 'TitledTable')(TitleTableBase);

export const asTitleTableToken = asVitalTokenSpec<TitleTableComponents>();

export default withoutHydration()(TitleTableClean);
