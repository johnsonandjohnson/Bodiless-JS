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

import {
  addClasses,
  withDesign,
  Img,
  Div,
  Span,
  Label,
} from '@bodiless/fclasses';

const providersDesign = {
  ProvidersWrapper: addClasses('m-2'),
  ProviderList: addClasses('p-1'),
};

const socialShareDesign = {
  SocialShareWrapper: addClasses('my-4 flex flex-row-reverse'),
  SocialShareButton: addClasses('m-2 py-2 px-4 bg-teal-500 rounded text-white cursor-pointer'),
  SocialShareProdviders: withDesign(providersDesign),
};

const socialShareOrangeDesign = {
  SocialShareWrapper: addClasses('my-4 flex flex-row-reverse'),
  SocialShareButton: addClasses('m-2 p-2 bg-orange-600 cursor-pointer rounded'),
  SocialShareProdviders: withDesign(providersDesign),
};

export const StyledIcon = addClasses('material-icons cursor-pointer align-middle text-white mr-2')(Span);
export const WhiteIcon = addClasses('material-icons cursor-pointer align-middle text-white')(Span);
export const StyledLabel = addClasses('cursor-pointer')(Label);
export const Logo = addClasses('bg-blue-500 w-full rounded-full cursor-pointer transition duration-500 ease-in-out hover:bg-black transform hover:-translate-y-1 hover:scale-110')(Img);
export const LogoNoBackground = addClasses('w-full cursor-pointer')(Img);
export const LogoWrapper = addClasses('w-8')(Div);
export const DropZoneWrapper = addClasses('my-2')(Div);

export const DropZoneDesign = {
  UploadArea: addClasses('w-full bg-gray-600 text-center p-2')(Div),
};

const asSimpleSocialShare = withDesign(socialShareDesign);
export const asOrangeSocialShare = withDesign(socialShareOrangeDesign);

export default asSimpleSocialShare;
