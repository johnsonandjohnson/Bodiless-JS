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

import React, { useEffect, ComponentType } from 'react';
import type {
  AsBodiless,
  BodilessOptions,
} from '@bodiless/core';
import asBodilessIframe from './iFrame';
import type {
  Props as IframeProps,
  Data as IframeData,
} from './iFrame';

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
const isValidYoutubeUrl = extractVideoIdFromUrl;

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

const URL_FIELD = 'src';
const YOUTUBE_ERROR = 'Invalid video url specified';

const useFormOverrides = (props: IframeProps, options: BodilessOptions<IframeProps, IframeData>) => ({
  renderForm: (formProps: any) => {
    const { formState, formApi } = formProps;
    const { values, errors } = formState;
    const { [URL_FIELD]: urlValue } = values;
    useEffect(() => {
      if (urlValue !== undefined) {
        const isValid = isValidYoutubeUrl(urlValue);
        if (errors.src === undefined && !isValid) {
          formApi.setError(URL_FIELD, YOUTUBE_ERROR);
        }
        if (errors.src === YOUTUBE_ERROR && isValid) {
          formApi.setError(URL_FIELD, undefined);
        }
      }
    });
    return options.renderForm(formProps);
  }
});

const asBodilessYoutube: AsBodiless<IframeProps, IframeData> = (
  nodeKeys?,
  defaultData?,
  //useOverrides?,
) => asBodilessIframe(nodeKeys, defaultData, useFormOverrides);

const Youtube = asBodilessYoutube()('iframe');

export default Youtube;
export {
  asBodilessYoutube,
  withYoutubePlayerSettings,
};
