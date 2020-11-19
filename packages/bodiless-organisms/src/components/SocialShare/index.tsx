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
import {
  ProvidersComponents,
  SocialShareProvidersProps,
  SocialShareComponents,
  SocialShareProps,
} from './types';

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
    addClassesIf(() => expanded)('flex'),
  )(ProvidersWrapper);

  return (
    <ProvidersWrapperStyled>
      {
        providers.map(Provider => (
          <ProviderList key={Provider.id}>
            { Provider.element }
          </ProviderList>
        ))
      }
    </ProvidersWrapperStyled>
  );
};

const SocialShareProviders = designable(providersComponents, 'SocialShareProviders')(ProvidersClean);

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

const SocialShare = designable(socialShareComponents, 'SocialShare')(SocialShareBase);
export default SocialShare;
