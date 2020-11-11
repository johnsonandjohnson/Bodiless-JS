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
  FunctionComponent as FC,
  useState,
} from 'react';
import { flow } from 'lodash';
import {
  Div,
  Button,
  Ul,
  Li,
  designable,
  addClassesIf,
} from '@bodiless/fclasses';
// import {
//   useMenuOptionUI,
// } from '@bodiless/core';
import {
  withMeta,
} from '../Meta/Meta';
import withMetaForm from '../Meta/withMetaForm';
import {
  ProvidersComponents,
  SocialShareProvidersProps,
  SocialShareComponents,
  SocialShareProps,
  SocialShareProdviderScript,
} from './types';

const withMetaOGTitle = withMeta({
  name: 'og:title',
  // useFormElement: () => useMenuOptionUI().ComponentFormTextArea,
  label: 'Description',
  // placeholder: 'Rec < 160 char',
});

const WrapperClean: FC = ({ children, ...props }) => <Div {...props}>{ children }</Div>;
/**
 * Display a social share button.
 *
 * @param buttonContent - a string or JSX element provides content of share button.
 *        for example, to display a Material Share icon, use
 *            <MaterialIcon className="bl-material-icons" icon="share" />
 */
const ButtonClean: FC<any> = ({
  buttonContent: content,
  onClick,
  ...props
}) => (
  <Button onClick={onClick} {...props}>
    {content || 'Share'}
  </Button>
);

const providersComponents: ProvidersComponents = {
  ProvidersWrapper: Ul,
  ProviderList: Li,
};
const ProvidersClean: FC<SocialShareProvidersProps> = ({
  components,
  expanded,
  providers,
}) => {
  const {
    ProvidersWrapper,
    ProviderList,
  } = components;

  const ProvidersWrapperStyled = flow(
    addClassesIf(() => !expanded)('hidden'),
  )(ProvidersWrapper);

  const applyScript = (script: SocialShareProdviderScript) => {
    const firstScript = document.getElementsByTagName('script')[0];
    if (document.getElementById(script.id)) return;
    const js = document.createElement('script');
    js.id = script.id;
    js.src = script.src;
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(js, firstScript);
    }
  };

  return (
    <ProvidersWrapperStyled>
      {
        providers.map(Provider => {
          if (Provider.script) {
            applyScript(Provider.script);
          }
          return (
            <ProviderList key={Provider.id}>
              { Provider.element }
            </ProviderList>
          );
        })
      }
    </ProvidersWrapperStyled>
  );
};

const SocialShareProviders = designable(providersComponents)(ProvidersClean);

const socialShareComponents: SocialShareComponents = {
  SocialShareWrapper: WrapperClean,
  SocialShareButton: ButtonClean,
  SocialShareProdviders: SocialShareProviders,
};

export const SocialShareBase: FC<SocialShareProps> = ({
  components,
  buttonContent,
  providers,
  ...props
}) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);
  const {
    SocialShareWrapper,
    SocialShareButton,
    SocialShareProdviders,
  } = components;

  return (
    <SocialShareWrapper {...props}>
      <SocialShareButton buttonContent={buttonContent} onClick={toggleExpanded} />
      <SocialShareProdviders
        expanded={expanded}
        providers={providers}
      />
    </SocialShareWrapper>
  );
};

const useMenuOptions = () => [
  {
    name: 'share',
    icon: 'share',
    label: 'Social Share',
  },
];

const seoFormHeader = {
  title: 'SEO Data Management',
  description: `Enter the page level data used for SEO. 
  This is metadata needed for SEO that will go in the page header.`,
};

const SocialShare = flow(
  withMetaForm(useMenuOptions, seoFormHeader),
  // withMetaOGTitle('og:title', ''),
  designable(socialShareComponents),
)(SocialShareBase);
export default SocialShare;
