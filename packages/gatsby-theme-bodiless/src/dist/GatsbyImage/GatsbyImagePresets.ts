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

enum GatsbyImagePresets {
  Fixed = 'fixed',
  FixedNoBase64 ='fixed_noBase64',
  FixedTracedSVG = 'fixed_tracedSVG',
  FixedWithWebp = 'fixed_withWebp',
  FixedWithWebpNoBase64 = 'fixed_withWebp_noBase64',
  FixedWithWebpTracedSVG = 'fixed_withWebp_tracedSVG',
  Fluid = 'fluid',
  FluidNoBase64 = 'fluid_noBase64',
  FluidTracedSVG = 'fluid_tracedSVG',
  FluidWithWebp = 'fluid_withWebp',
  FluidWithWebpNoBase64 = 'fluid_withWebp_noBase64',
  FluidWithWebpTracedSVG = 'fluid_withWebp_tracedSVG',
  FluidLimitPresentationSize = 'fluidLimitPresentationSize',
}

export default GatsbyImagePresets;
