import { on } from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer';
import { CardClean } from '@bodiless/vital-card';
import { StyledEditor, StyledEditorClean } from '../../../components/StyledEditor';
import { asGetStarted } from '../../../components/Card';
import { TitleTableClean, asSecondColumnHighlightedTitle, asThirdColumnHighlightedTitle } from '../../../components/Tables';

const ExtraPadding = asFluidToken(vitalFlowContainerBase.Default, {
  Spacing: {
    ComponentWrapper: 'my-12',
  },
});

const Default = asFluidToken(
  {
    ...vitalFlowContainerBase.Default,
    Components: {
      ...vitalFlowContainerBase.Default.Components,
      StyledEditorBorder: on(StyledEditorClean)(StyledEditor.Borders),
      GetStarted: on(CardClean)(asGetStarted),
      SecondHighlightedTable: on(TitleTableClean)(asSecondColumnHighlightedTitle),
      ThirdHighlightedTable: on(TitleTableClean)(asThirdColumnHighlightedTitle),
    },
  },
  ExtraPadding,
);

export default {
  ...vitalFlowContainerBase,
  Default,
};
