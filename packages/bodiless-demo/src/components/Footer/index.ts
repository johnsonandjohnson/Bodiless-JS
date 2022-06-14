import { replaceWith, Div, on } from '@bodiless/fclasses';
import {
  asFooterToken, vitalFooter, CopyrightRowClean, vitalCopyrightRow,
} from '@bodiless/vital-layout';
import { GitButtons } from '../GitHubButtons';

const asBodilessDemoFooter = asFooterToken({
  ...vitalFooter.Base,
  Components: {
    ...vitalFooter.Base.Components,
    Column1Wrapper: replaceWith(Div),
    RewardsWrapper: replaceWith(Div),
    Rewards: replaceWith(GitButtons),
    CopyrightRow: replaceWith(() => null),
    CopyrightRowOutsideColumns: on(CopyrightRowClean)(
      vitalCopyrightRow.CopyrightNoSocialLinks,
    ),
  },
  Layout: {
    Wrapper: 'w-full',
    Container: 'flex flex-row flex-wrap',
    Column1Wrapper: 'w-full md:w-1/3',
    Column2Wrapper: 'w-full md:w-2/3',
  },
  Spacing: {
    ...vitalFooter.Base.Spacing,
    Column1Wrapper: 'py-9',
    CopyrightRowOutsideColumns: 'w-full',
  },
});

export default asBodilessDemoFooter;
