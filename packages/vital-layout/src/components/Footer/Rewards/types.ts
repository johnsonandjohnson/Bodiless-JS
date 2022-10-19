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

import { ComponentOrTag, DesignableComponents, DesignableComponentsProps } from '@bodiless/fclasses';

/**
 * Type of the design element in the VitalDS `Rewards` component.
 * This is a Stub component that renders a placeholder.
 *
 * RECOMMEND TO NOT USE and marked as deprecated
 *
 * @category Component
 * @deprecated
 */
interface RewardsComponents extends DesignableComponents {
  Wrapper: ComponentOrTag<any>,
  Brand: ComponentOrTag<any>,
  Title: ComponentOrTag<any>,
  Body: ComponentOrTag<any>,
  FormWrapper: ComponentOrTag<any>,
  FormTextFirstName: ComponentOrTag<any>,
  FormTextEmail: ComponentOrTag<any>,
  FormButton: ComponentOrTag<any>,
  Footnote: ComponentOrTag<any>,
}

type RewardsProps = DesignableComponentsProps<RewardsComponents>;

export type {
  RewardsComponents,
  RewardsProps,
};
