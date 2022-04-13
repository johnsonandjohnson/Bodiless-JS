/**
 * Copyright © 2022 Johnson & Johnson
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
import React, { FC, HTMLProps } from 'react';
import Helmet from 'react-helmet';
import {
  designable,
  stylable,
  ComponentOrTag,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { HelmetComponents, HelmetProps } from './types';

/**
 * @private
 * Creates a react helmet component which adds the specified tag to the header
 * and passes all props to that tag.
 */
const createTagHelmet = <P extends object>(Tag: ComponentOrTag<P>) => {
  const TagHelmet: FC<P> = props => (
    <Helmet>
      <Tag {...props} />
    </Helmet>
  );
  return stylable(TagHelmet);
};

/**
 * @private
 * Base component for modifying the header of a VitalDS site.
 */
const HelmetBase: FC<HelmetProps> = ({ components }) => {
  const {
    HreflangHelmet, GtmHelmet, SeoHelmet, SocialShareHelmet, LanguageHelmet,
    HTMLHelmet, BodyHelmet,
  } = components;
  return (
    <>
      <HreflangHelmet />
      <GtmHelmet />
      <SeoHelmet />
      <SocialShareHelmet />
      <LanguageHelmet />
      <HTMLHelmet />
      <BodyHelmet />
    </>
  );
};

/**
 * @private
 * Starting components for the helmet.
 */
const helmetComponents: HelmetComponents = {
  HreflangHelmet: Helmet,
  GtmHelmet: Helmet,
  SeoHelmet: Helmet,
  SocialShareHelmet: Helmet,
  LanguageHelmet: Helmet,
  HTMLHelmet: createTagHelmet<HTMLProps<HTMLHtmlElement>>('html'),
  BodyHelmet: createTagHelmet<HTMLProps<HTMLBodyElement>>('body'),
};

/**
 * A designable component which can be used to add different elements to the
 * head section, html or body tags.
 */
const HelmetClean = designable(helmetComponents, 'Helmet')(HelmetBase);

export default HelmetClean;

/**
 * Use this to define a token applicable to the VitalDS `HelmetClean` component.
 *
 * @see HelmetClean
 */
export const asHelmetToken = asVitalTokenSpec<HelmetComponents>();
