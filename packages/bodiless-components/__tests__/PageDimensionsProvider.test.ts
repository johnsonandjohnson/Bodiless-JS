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

import { mapBreakpointsSize } from '../src/PageDimensionsProvider';

describe('mapBreakpointsSize', () => {
  it('gets right screen size on different width', () => {
    const breakpoints = {
      xs: 320,
      sm_custom: 530,
      md: 768,
      md_vertical: 767,
      md_landscape: 900,
      lg: 1024,
      max: 1160,
      sm: 640,
      xl: 1280,
    };

    const sizeDefault = mapBreakpointsSize(breakpoints, 300);
    const sizeXs = mapBreakpointsSize(breakpoints, 320);
    const sizeLg1 = mapBreakpointsSize(breakpoints, 1024);
    const sizeLg2 = mapBreakpointsSize(breakpoints, 1025);
    const sizeLg3 = mapBreakpointsSize(breakpoints, 1100);
    const sizeMax = mapBreakpointsSize(breakpoints, 1160);
    const sizeXl = mapBreakpointsSize(breakpoints, 1300);

    expect(sizeDefault).toBe('_default');
    expect(sizeXs).toBe('xs');
    expect(sizeLg1).toBe('lg');
    expect(sizeLg2).toBe('lg');
    expect(sizeLg3).toBe('lg');
    expect(sizeMax).toBe('max');
    expect(sizeXl).toBe('xl');
  });
});
