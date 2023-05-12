/**
 * Copyright © 2023 Johnson & Johnson
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

enum NextImagePresets {
  /**
   * Fixed-size image.
   */
  Fixed = 'fixed',
  /**
   * Fixed-size image with disabled blur-up effect.
   */
  FixedNoBase64 ='fixed_noBase64',
  /**
   * Preset not supported, Fixed is used as fallback.
   * The preset is kept to allow a smooth migration from Gatsby to Next.
   */
  FixedTracedSVG = 'fixed_tracedSVG',
  /**
   * Preset not supported, Fixed is used as fallback.
   * The preset is kept to allow a smooth migration from Gatsby to Next.
   */
  FixedWithWebp = 'fixed_withWebp',
  /**
   * Preset not supported, FixedNoBase64 is used as fallback.
   * The preset is kept to allow a smooth migration from Gatsby to Next.
   */
  FixedWithWebpNoBase64 = 'fixed_withWebp_noBase64',
  /**
   * Preset not supported, Fixed is used as fallback.
   * The preset is kept to allow a smooth migration from Gatsby to Next.
   */
  FixedWithWebpTracedSVG = 'fixed_withWebp_tracedSVG',
  /**
   * Fluid-size (stretched to match the container’s width and height) image.
   */
  Fluid = 'fluid',
  /**
   * Fluid-size image with disabled blur-up effect.
   */
  FluidNoBase64 = 'fluid_noBase64',
  /**
   * Preset not supported, Fluid is used as fallback.
   * The preset is kept to allow a smooth migration from Gatsby to Next.
   */
  FluidTracedSVG = 'fluid_tracedSVG',
  /**
   * Preset not supported, Fluid is used as fallback.
   * The preset is kept to allow a smooth migration from Gatsby to Next.
   */
  FluidWithWebp = 'fluid_withWebp',
  /**
   * Preset not supported, FluidNoBase64 is used as fallback.
   * The preset is kept to allow a smooth migration from Gatsby to Next.
   */
  FluidWithWebpNoBase64 = 'fluid_withWebp_noBase64',
  /**
   * Preset not supported, Fluid is used as fallback.
   * The preset is kept to allow a smooth migration from Gatsby to Next.
   */
  FluidWithWebpTracedSVG = 'fluid_withWebp_tracedSVG',
  /**
   * Preset not supported, Fluid is used as fallback.
   * The preset is kept to allow a smooth migration from Gatsby to Next.
   */
  FluidLimitPresentationSize = 'fluidLimitPresentationSize',
}

export default NextImagePresets;
