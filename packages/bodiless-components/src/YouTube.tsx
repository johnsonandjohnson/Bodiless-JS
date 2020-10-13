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

import React, {
  useCallback,
  ComponentType,
  useState,
  useEffect,
  useContext,
} from 'react';
import { flowRight } from 'lodash';
import { useMenuOptionUI } from '@bodiless/core';
import type { AsBodiless } from '@bodiless/core';
import { addProps } from '@bodiless/fclasses';
import withFormHeader from './withFormHeader';
import withFormSnippet from './withFormSnippet';
import { asBaseBodilessIframe } from './Iframe';
import type {
  Props as IframeProps,
  Data as IframeData,
} from './Iframe';

/**
 * YouTube embed player parameters
 *
 * @see https://developers.google.com/youtube/player_parameters#Parameters
 */
type YouTubePlayerSettings = {
  autoplay: boolean | 0 | 1,
  cc_lang_pref: string,
  cc_load_policy: boolean | 0 | 1,
  controls: boolean | 0 | 1,
  loop: boolean | 0 | 1,
  enablejsapi: boolean | 0 | 1,
  modestbranding: boolean | 0 | 1,
  rel: boolean | 0 | 1,
  mute: boolean | 0 | 1,
  origin: string,
  version: number,
  playlist: string,
};

type Props = IframeProps & {
  playerSettings?: YouTubePlayerSettings,
};

// https://stackoverflow.com/a/9102270
const extractVideoIdFromUrl = (url: string) => {
  // eslint-disable-next-line no-useless-escape
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : undefined;
};
const isValidYouTubeUrl = extractVideoIdFromUrl;

const withYouTubePlayerSettings = (
  settings: Partial<YouTubePlayerSettings>,
) => addProps({
  playerSettings: settings,
});

/*
* adjust loop settings per https://developers.google.com/youtube/player_parameters#loop
*/
const adjustLoopPlayerSettings = (settings: Partial<YouTubePlayerSettings>, videoId: string) => ({
  ...settings,
  ...(settings.loop && videoId && { playlist: videoId, version: 3 }),
});

const withYouTubePlayerTransformer = (Component: ComponentType<any>) => {
  const WithYouTubePlayerTransformer = (props: any) => {
    const { playerSettings, src, ...rest } = props;
    const videoId = src ? extractVideoIdFromUrl(src) : '';
    const src$ = `https://www.youtube.com/embed/${videoId}`;
    const url = new URL(src$);
    if (playerSettings !== undefined && videoId !== undefined) {
      const playerSettings$ = adjustLoopPlayerSettings(playerSettings, videoId);
      Object.entries(playerSettings$).forEach(setting => {
        const [key, value] = setting;
        url.searchParams.set(key, String(value));
      });
    }
    return <Component {...rest} src={url.toString()} />;
  };
  WithYouTubePlayerTransformer.displayName = 'WithYouTubePlayerTransformer';
  return WithYouTubePlayerTransformer;
};

type YouTubePlayerContextData = {
  isLoaded: boolean;
};

const YouTubePlayerAPIContext = React.createContext<YouTubePlayerContextData>({
  isLoaded: false,
});

const YouTubePlayerAPIProvider: ComponentType<any> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const scriptId = 'youtubeplayerapiscript';
    const scriptSrc = 'https://www.youtube.com/iframe_api';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.async = true;
      script.src = scriptSrc;
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  });
  useEffect(() => {
    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      setIsLoaded(true);
    };
  });
  return (
    <YouTubePlayerAPIContext.Provider value={{ isLoaded }}>
      {children}
    </YouTubePlayerAPIContext.Provider>
  );
};

const withYouTubePlayerAPI = (Component: ComponentType<any>) => {
  const WithYouTubePlayerAPI = (props: any) => (
    <YouTubePlayerAPIProvider>
      <Component {...props} />
    </YouTubePlayerAPIProvider>
  );
  WithYouTubePlayerAPI.displayName = 'WithYouTubePlayerAPI';
  return WithYouTubePlayerAPI;
};

const useYouTubePlayerAPI = () => useContext(YouTubePlayerAPIContext);
const ifYouTubePlayerAPILoaded = () => useContext(YouTubePlayerAPIContext).isLoaded;
const ifNotYouTubePlayerAPILoaded = () => !useContext(YouTubePlayerAPIContext).isLoaded;

const withYouTubeFormSrcSnippet = withFormSnippet({
  nodeKeys: 'src',
  defaultData: { src: '' },
  snippetOptions: {
    renderForm: ({ formState }) => {
      const { errors } = formState;
      const {
        ComponentFormLabel,
        ComponentFormText,
        ComponentFormWarning,
      } = useMenuOptionUI();
      const validate = useCallback(
        (value: string) => (!value || !isValidYouTubeUrl(value)
          ? 'Invalid YouTube URL specified.'
          : undefined),
        [],
      );
      return (
        <React.Fragment key="src">
          <ComponentFormLabel htmlFor="src">URL</ComponentFormLabel>
          <ComponentFormText
            field="src"
            placeholder="https://"
            validate={validate}
            validateOnChange
            validateOnBlur
          />
          {errors && errors.src && (
          <ComponentFormWarning>{errors.src}</ComponentFormWarning>
          )}
        </React.Fragment>
      );
    },
  },
});

const withYouTubeFormHeader = withFormHeader({
  title: 'YouTube Configuration',
});

const asBaseBodilessYouTube: AsBodiless<Props, IframeData> = asBaseBodilessIframe;

const asBodilessYouTube: AsBodiless<Props, IframeData> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
) => flowRight(
  asBaseBodilessYouTube(nodeKeys, defaultData, useOverrides),
  withYouTubeFormHeader,
  withYouTubeFormSrcSnippet,
  withYouTubePlayerTransformer,
);

const YouTube = asBodilessYouTube()('iframe');

export default YouTube;
export {
  asBaseBodilessYouTube,
  asBodilessYouTube,
  withYouTubePlayerSettings,
  withYouTubeFormHeader,
  withYouTubeFormSrcSnippet,
  withYouTubePlayerTransformer,
  useYouTubePlayerAPI,
  ifYouTubePlayerAPILoaded,
  ifNotYouTubePlayerAPILoaded,
  withYouTubePlayerAPI,
  YouTubePlayerAPIProvider,
};
export type { YouTubePlayerSettings };
