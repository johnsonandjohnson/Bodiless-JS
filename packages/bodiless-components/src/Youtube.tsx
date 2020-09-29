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
import { useMenuOptionUI } from '@bodiless/core';
import { flowRight } from 'lodash';
import withFormSnippet from './withFormSnippet';
import { asBaseBodilessIframe, withHeightSnippet } from './Iframe';
import type {
  Props as IframeProps,
  Data as IframeData,
  AsIframeBodiless,
} from './Iframe';

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
  // eslint-disable-next-line no-useless-escape
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : undefined;
};
const isValidYoutubeUrl = extractVideoIdFromUrl;

const withYoutubePlayerSettings = (
  settings: Partial<YoutubePlayerSettings>,
) => (Component: ComponentType<any>) => {
  const WithYoutubePlayerSettings = (props: any) => {
    const { src, ...rest } = props;
    const url = new URL(src);
    Object.entries(settings).forEach(setting => {
      const [key, value] = setting;
      url.searchParams.set(key, String(value));
    });
    return <Component {...rest} src={url} />;
  };
  WithYoutubePlayerSettings.displayName = 'WithYoutubePlayerSettings';
  return WithYoutubePlayerSettings;
};

const withYoutubeSrcSnippet = withFormSnippet({
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
        (value: string) => (!value || !isValidYoutubeUrl(value)
          ? 'Invalid youtube URL specified.'
          : undefined),
        [],
      );
      return (
        <React.Fragment key="src">
          <ComponentFormLabel htmlFor="src">Src</ComponentFormLabel>
          <ComponentFormText
            field="src"
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

const asBaseBodilessYoutube: AsIframeBodiless<IframeProps, IframeData> = asBaseBodilessIframe;

const asBodilessYoutube: AsIframeBodiless<IframeProps, IframeData> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
  Wrapper?: ComponentType<any> | string,
) => flowRight(
  asBaseBodilessYoutube(nodeKeys, defaultData, useOverrides, Wrapper),
  withHeightSnippet,
  withYoutubeSrcSnippet,
);

const Youtube = asBodilessYoutube()('iframe');

export default Youtube;
export {
  asBaseBodilessYoutube,
  asBodilessYoutube,
  withYoutubePlayerSettings,
  withYoutubeSrcSnippet,
};
