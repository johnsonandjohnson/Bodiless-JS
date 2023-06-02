import { asFooterToken } from '@bodiless/vital-layout';
import {
  Div,
  startWith,
} from '@bodiless/fclasses';
import { vitalFooterBase } from '@bodiless/vital-layout/lib/base';
import LogoIcon from '../../../assets/images/logo';

// NOTE: In truth, all of the styling found within this withTopFooterWave token
// could be applied directly to the exampleFooter token below, but is separated
// here for readability and modularity's sake.

const WithTopWave = asFooterToken({
  Theme: {
    // NOTE: Here in 'Theme' domain of our footer token, we apply our footer-wave
    // class to the container (Wrapper) at desktop screen sizes using Tailwind's '2xl' prefix.
    Wrapper: '2xl:footer-wave',
    Column2Wrapper: '2xl:before:content-none before:content-[\'\'] before:bg-mobile-wave-top relative',
  },
  Spacing: {
    Wrapper: 'py-40',
    Column2Wrapper: 'before:mr-[-50vw] before:right-[50%] before:top-[-310px]'
  },
  Layout: {
    Column2Wrapper: 'before:absolute before:w-screen before:h-9'
  },
});
// Here, we'll merge two tokens by passing 2 arguments to `asFooterToken`
const Default = asFooterToken({
// In the first argument, we'll spread the values of the original token, overriding
// only the `Rewards` and `RewardsWrapper` slots in the `Components` domain.
  ...vitalFooterBase.Default,
  Components: {
    ...vitalFooterBase.Default.Components,
    RewardsWrapper: startWith(Div),
    Rewards:
      // NOTE: Here we replace our footer's current 'Rewards' slot with
      // our custom logo using the `startWith` HOC.
      startWith(LogoIcon)
  },
}, {
  // In the second, we'll *add* styling to the `Spacing` domain,
  // and add our 'WithFooterWave' token to the 'Compose' domain.
  Spacing: {
    Wrapper: 'py-40',
    RewardsWrapper: '2xl:px-40 py-10',
  },
  Compose: {
    WithTopWave,
  }
},);

export default {
  Default,
  WithTopWave,
};
