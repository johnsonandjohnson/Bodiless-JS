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

import { flow } from 'lodash';
import {
  ToutClean,
  withToutResetButtons,
} from '@bodiless/organisms';
import { asContentfulTout } from '../../../Tout';
import titleContent from './title';
import bodyContent from './body';
import imageContent from './image';
import ctaContent from './cta';

const toutContent = {
  ImageLink: ctaContent.link,
  Image: imageContent,
  Title: titleContent,
  // ToDo: bug. page refresh is required in order to get reverted changes.
  Body: bodyContent,
  Link: {
    Link: ctaContent.link,
    Text: ctaContent.text,
  },
};

const GivingBackToCommunity = flow(
  withToutResetButtons(toutContent),
  asContentfulTout(toutContent),
)(ToutClean);

export default GivingBackToCommunity;
