/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  withYouTubePlayerSettings,
  ifNotYouTubePlayerAPILoaded,
  useYouTubePlayerAPI,
  YouTubePlayerAPIProvider,
} from '@bodiless/components';
import {
  withDesign,
  A,
  H2,
  Button,
  addClasses,
  addProps,
  flowIf,
} from '@bodiless/fclasses';
import { flowRight } from 'lodash';
import Layout from '../../../components/Layout';
import {
  DefaultReponsive16By9YouTube,
  Reponsive16By9AutoPlayYouTube,
  defaultPlayerSettings,
} from '../../../components/YouTube';

// Note: it will work only for videos with own published Subtitles
// Auto-generated Subtitles won't be shown
// see: https://support.google.com/youtube/forum/AAAAiuErobUlyT60UUHtHE
const withShownCaptions = withYouTubePlayerSettings({
  ...defaultPlayerSettings,
  cc_load_policy: 1,
});

declare global {
  interface Window {
    ytplayer: {
      playVideo: Function;
      stopVideo: Function;
    };
  }
}

const YouTubeWithShownCaptions = withDesign({
  Item: withShownCaptions,
})(DefaultReponsive16By9YouTube);

const withoutControls = withYouTubePlayerSettings({
  ...defaultPlayerSettings,
  controls: 0,
});

const YouTubeWithoutControls = withDesign({
  Item: withoutControls,
})(DefaultReponsive16By9YouTube);

const withLoop = withYouTubePlayerSettings({
  ...defaultPlayerSettings,
  loop: 1,
});

const YouTubeWithLoop = withDesign({
  Item: withLoop,
})(DefaultReponsive16By9YouTube);

const withJSApi = flowRight(
  withYouTubePlayerSettings({
    ...defaultPlayerSettings,
    enablejsapi: 1,
    mute: 1,
    origin: '',
  }),
);

const JS_API_IFRAME_ID = 'jsapidemo';

const withYTPlayer = (playerId: string) => (Component: any) => (props: any) => {
  const { isLoaded } = useYouTubePlayerAPI();
  useEffect(() => {
    if (isLoaded) {
      // @ts-ignore
      // ToDo make it more generic. Allow supporting multiple players on a page.
      window.ytplayer = new YT.Player(playerId, {
        events: { onReady: () => { } },
      });
    }
  }, [isLoaded]);
  return (
    <Component {...props} />
  );
};

const StyledButton = addClasses('border p-2 m-2 inline')(Button);
const YouTubeButton = flowIf(
  ifNotYouTubePlayerAPILoaded,
)(addProps({ disabled: true }))(StyledButton);

const PlayButton = flowRight(
  addProps({
    onClick: () => {
      if (window.ytplayer !== undefined && typeof window.ytplayer.playVideo === 'function') {
        window.ytplayer.playVideo();
      }
    },
  }),
)(YouTubeButton);

const StopButton = flowRight(
  addProps({
    onClick: () => {
      if (window.ytplayer !== undefined && typeof window.ytplayer.stopVideo === 'function') {
        window.ytplayer.stopVideo();
      }
    },
  }),
)(YouTubeButton);

const YouTubeWithJSApi = withDesign({
  Item: flowRight(
    withJSApi,
    withYTPlayer(JS_API_IFRAME_ID),
    addProps({ id: JS_API_IFRAME_ID }),
  ),
})(DefaultReponsive16By9YouTube);

const withoutModestBranding = withYouTubePlayerSettings({
  ...defaultPlayerSettings,
  modestbranding: 0,
});

const YouTubeWithoutModestBranding = withDesign({
  Item: withoutModestBranding,
})(DefaultReponsive16By9YouTube);

const withRelatedVideos = withYouTubePlayerSettings({
  ...defaultPlayerSettings,
  rel: 1,
});

const YouTubeWithRelatedVideos = withDesign({
  Item: withRelatedVideos,
})(DefaultReponsive16By9YouTube);

const Header2 = addClasses('text-xl font-bold my-4')(H2);
const AnchorLink = addClasses('text-blue-700 underline block my-1')(A);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">YouTube Demo</h1>

      <AnchorLink href="#defaultSettings">Responsive YouTube 16:9 with default settings</AnchorLink>
      <AnchorLink href="#autoplay">Responsive Autoplay YouTube 16:9</AnchorLink>
      <AnchorLink href="#withShownCaptions">Responsive YouTube 16:9 with shown captions</AnchorLink>
      <AnchorLink href="#withoutControls">Responsive YouTube 16:9 without controls</AnchorLink>
      <AnchorLink href="#withLoop">Responsive YouTube 16:9 with loop</AnchorLink>
      <AnchorLink href="#withJSAPI">YouTube Player JS API</AnchorLink>
      <AnchorLink href="#withoutJSApi">Responsive YouTube 16:9 without modest branding</AnchorLink>
      <AnchorLink href="#withRelated">Responsive YouTube 16:9 with related videos</AnchorLink>
      <Header2 id="defaultSettings">Responsive YouTube 16:9 with default settings</Header2>
      <DefaultReponsive16By9YouTube nodeKey="default" />
      <Header2 id="autoplay">Responsive Autoplay YouTube 16:9</Header2>
      <Reponsive16By9AutoPlayYouTube nodeKey="autoplay" />
      <Header2 id="withShownCaptions">Responsive YouTube 16:9 with shown captions</Header2>
      <YouTubeWithShownCaptions nodeKey="shownCaptions" />
      <Header2 id="withoutControls">Responsive YouTube 16:9 without controls</Header2>
      <YouTubeWithoutControls nodeKey="withoutControls" />
      <Header2 id="withLoop">Responsive YouTube 16:9 with loop</Header2>
      <YouTubeWithLoop nodeKey="withLoop" />
      <Header2 id="withJSAPI">YouTube Player API</Header2>
      <YouTubePlayerAPIProvider>
        <PlayButton>Play</PlayButton>
        <StopButton>Stop</StopButton>
        <YouTubeWithJSApi nodeKey="withJsApi" />
      </YouTubePlayerAPIProvider>
      <Header2 id="withoutModestBranding">Responsive YouTube 16:9 without modest branding</Header2>
      <YouTubeWithoutModestBranding nodeKey="withoutModestBranding" />
      <Header2 id="withRelated">Responsive YouTube 16:9 with related videos</Header2>
      <YouTubeWithRelatedVideos nodeKey="withRel" />
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
