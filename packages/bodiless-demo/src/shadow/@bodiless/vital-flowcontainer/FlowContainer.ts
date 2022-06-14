import { useNode } from '@bodiless/core';
import { flowIf, on } from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer';
import { CardClean } from '@bodiless/vital-card';
import { StyledEditor, StyledEditorClean } from '../../../components/StyledEditor';
import { asGetStarted } from '../../../components/Cards';

const isHome = () => useNode().node.pagePath === '/';

const ExtraPaddingOnHome = asFluidToken(vitalFlowContainerBase.Default, {
  Flow: flowIf(isHome),
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
    },
  },
  ExtraPaddingOnHome,
);

export default {
  ...vitalFlowContainerBase,
  Default,
};
