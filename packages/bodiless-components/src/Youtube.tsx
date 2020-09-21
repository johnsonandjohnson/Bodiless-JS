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

import React, { useCallback, ComponentType } from 'react';
import { getUI } from '@bodiless/core';
import { addProps } from '@bodiless/fclasses';
import { flowRight } from 'lodash';
import asBodilessIframe from './iFrame';

export const asBodilessYoutube = asBodilessIframe;

type YoutubePlayerSettings = {
  autoplay: boolean,
  cc_lang_pref: string,
  cc_load_policy: boolean,
  controls: boolean,
  loop: boolean,
  enablejsapi: boolean,
  modestbranding: boolean,
  rel: boolean,
};

// https://stackoverflow.com/a/9102270
const extractVideoIdFromUrl = (url: string) => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length == 11 ? match[2] : undefined;
}

const withYoutubePlayerSettings = (settings: Partial<YoutubePlayerSettings>) =>
  (Component: ComponentType<any>) => {
    const WithYoutubePlayerSettings = (props: any) => {
      const { src, ...rest } = props;
      const url = new URL(src);
      Object.entries(settings).forEach(setting => {
        const [key, value] = setting;
        url.searchParams.set(key, String(value));
      });
      return <Component {...rest} src={url} />
    }
    WithYoutubePlayerSettings.displayName = 'WithYoutubePlayerSettings';
    return WithYoutubePlayerSettings;
  }

const withYoutubeVideoTransformer = (Component : ComponentType<any>) => {
  const WithYoutubeVideoTransformer = ({ videoId, ...rest } : any) => 
    <Component
      src={`https://www.youtube.com/embed/${videoId}`} {...rest}
    />;
  return WithYoutubeVideoTransformer;
};

const Youtube = flowRight(
  /*addProps({
    height: "500px",
    width: "900px"
  }),*/
  asBodilessIframe(undefined, undefined, props => ({
    renderForm: ({ ui: formUi, formState }) => {
      const { errors } = formState;
      const {
        ComponentFormTitle,
        ComponentFormLabel,
        ComponentFormText,
        ComponentFormWarning
      } = getUI(formUi);
      return (
        <>
          <ComponentFormTitle>Youtube video</ComponentFormTitle>
          <ComponentFormLabel htmlFor="video-url">Video URL</ComponentFormLabel>
          <ComponentFormText
            field="videoId"
            id="video-url"
            validate={
              useCallback(
                (value: string) =>
                  !value || !extractVideoIdFromUrl(value)
                  ? `Enter No special characters or spaces allowed`
                  : undefined,
              [])
            }
            validateOnChange
            validateOnBlur
          />
          {errors && errors.videoId && (
            <ComponentFormWarning>{errors.videoId}</ComponentFormWarning>
          )}
        </>
      );
    },
  })),
  withYoutubeVideoTransformer,
)('iframe');

export default Youtube;
export {
  withYoutubePlayerSettings,
};
