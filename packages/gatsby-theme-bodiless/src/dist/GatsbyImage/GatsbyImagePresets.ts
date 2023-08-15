/*
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

enum GatsbyImagePresets {
  /**
   * Fixed-size image.
   */
  Fixed = 'fixed',
  /**
   * Fixed-size image with disabled blur-up effect.
   */
  FixedNoBase64 ='fixed_noBase64',
  /**
   * Fixed-size image with traced placeholder SVG.
   */
  FixedTracedSVG = 'fixed_tracedSVG',
  /**
   * Fluid-size image with auto-generated WebP version.
   */
  FixedWithWebp = 'fixed_withWebp',
  /**
   * Fluid-size image with auto-generated WebP and disabled blur-up effect.
   */
  FixedWithWebpNoBase64 = 'fixed_withWebp_noBase64',
  /**
   * Fluid-size image with auto-generated WebP and traced placeholder SVG.
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
   * Fixed-size image with traced placeholder SVG.
   */
  FluidTracedSVG = 'fluid_tracedSVG',
  /**
   * Fixed-size image with auto-generated WebP version.
   */
  FluidWithWebp = 'fluid_withWebp',
  /**
   * Fixed-size image with auto-generated WebP and disabled blur-up effect.
   */
  FluidWithWebpNoBase64 = 'fluid_withWebp_noBase64',
  /**
   * Fixed-size image with auto-generated WebP and traced placeholder SVG.
   */
  FluidWithWebpTracedSVG = 'fluid_withWebp_tracedSVG',
  FluidLimitPresentationSize = 'fluidLimitPresentationSize',
}

export default GatsbyImagePresets;
