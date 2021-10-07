import React, { ComponentType, Fragment } from 'react';
import { varyDesign, extendDesign, FluidDesign } from '../src/Design';
import { HOC } from '../src';

/**
 * Copyright © 2019 Johnson & Johnson
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
type TestComponent = ComponentType<any> & {
  testText?: string,
};
const testHOC = (text: string): HOC => ((Component: TestComponent) => {
  const ReturnComponent = () => <Component />;
  ReturnComponent.testText = (Component.testText || '') + text;
  return ReturnComponent;
}) as HOC;
const getTestText = (hoc: HOC | undefined) => {
  if (typeof hoc === 'undefined') return '';
  const Item1 = hoc(Fragment) as TestComponent;
  return Item1.testText;
};
describe('varyDesign', () => {
  it('takes a Design and returns an HOD that will martix it.', () => {
    const baseDesign: FluidDesign = {
      Item1: testHOC('item1'),
      Item2: testHOC('item2'),
    };
    const additionDesign = {
      Addition: testHOC('addition'),
      Addition2: testHOC('addition2'),
    };
    const additionHOD = varyDesign(additionDesign);
    const finalDesign = additionHOD(baseDesign);
    expect(Object.getOwnPropertyNames(finalDesign)[0]).toBe('Item1Addition');
    expect(Object.getOwnPropertyNames(finalDesign)[2]).toBe('Item2Addition');
    expect(getTestText(finalDesign.Item1Addition)).toBe('item1addition');
    expect(getTestText(finalDesign.Item2Addition2)).toBe('item2addition2');
    // expect(finalDesign.Item2Addition(Fragment).testText).toBe('item2addition');
  });
  it('takes a Design and returns a HOD that returns it if the HOD is called empty', () => {
    const additionDesign = {
      Addition: testHOC('addition'),
      Addition2: testHOC('addition2'),
    };
    const additionHOD = varyDesign(additionDesign);
    const finalDesign = additionHOD();
    expect(Object.getOwnPropertyNames(finalDesign)[0]).toBe('Addition');
    expect(Object.getOwnPropertyNames(finalDesign)[1]).toBe('Addition2');
  });
  // tslint:disable-next-line: max-line-length
  it('will take X designs and return an HOD that matix all of them with the HOD design', () => {
    const baseDesign = {
      Item1: testHOC('item1'),
    };
    const additionDesign1: FluidDesign = {
      Addition: testHOC('addition'),
      Addition2: testHOC('addition2'),
    };
    const additionDesign2: FluidDesign = {
      Addition3: testHOC('addition3'),
      Addition4: testHOC('addition4'),
    };
    const additionHOD = varyDesign(additionDesign1, additionDesign2);
    const finalDesign = additionHOD(baseDesign);
    expect(Object.getOwnPropertyNames(finalDesign)[0]).toBe('Item1AdditionAddition3');
    expect(Object.getOwnPropertyNames(finalDesign)[1]).toBe('Item1AdditionAddition4');
    expect(Object.getOwnPropertyNames(finalDesign)[2]).toBe('Item1Addition2Addition3');
    expect(Object.getOwnPropertyNames(finalDesign)[3]).toBe('Item1Addition2Addition4');
  });
});
describe('extendDesign', () => {
  // tslint:disable-next-line: max-line-length
  it(' takes a Design an returns an hod that will combine the it to the HOD Design if there are unique keys', () => {
    const baseDesign: FluidDesign = {
      Item1: testHOC('item1'),
      Item2: testHOC('item2'),
    };
    const additionDesign = {
      Addition: testHOC('addition'),
      Addition2: testHOC('addition2'),
    };
    const finalDesign = extendDesign(additionDesign)(baseDesign);
    expect(Object.getOwnPropertyNames(finalDesign)[0]).toBe('Item1');
    expect(Object.getOwnPropertyNames(finalDesign)[1]).toBe('Item2');
    expect(Object.getOwnPropertyNames(finalDesign)[2]).toBe('Addition');
    expect(Object.getOwnPropertyNames(finalDesign)[3]).toBe('Addition2');
    expect(getTestText(finalDesign.Item1)).toBe('item1');
    expect(getTestText(finalDesign.Item2)).toBe('item2');
    expect(getTestText(finalDesign.Addition)).toBe('addition');
    expect(getTestText(finalDesign.Addition2)).toBe('addition2');
  });
  it('takes a Design and returns an hod that will wrap the HoD items if keys match', () => {
    const baseDesign = {
      Item1: testHOC('item1'),
      Item2: testHOC('item2'),
    };
    const additionDesign = {
      Addition: testHOC('addition'),
      Item1: testHOC('addto'),
      Addition2: testHOC('addition2'),
    };
    const finalDesign = extendDesign(additionDesign)(baseDesign);
    expect(Object.getOwnPropertyNames(finalDesign)[0]).toBe('Item1');
    expect(Object.getOwnPropertyNames(finalDesign)[1]).toBe('Item2');
    expect(Object.getOwnPropertyNames(finalDesign)[2]).toBe('Addition');
    expect(Object.getOwnPropertyNames(finalDesign)[3]).toBe('Addition2');
    expect(getTestText(finalDesign.Item1)).toBe('item1addto');
    expect(getTestText(finalDesign.Item2)).toBe('item2');
    expect(getTestText(finalDesign.Addition)).toBe('addition');
    expect(getTestText(finalDesign.Addition2)).toBe('addition2');
  });
  it('takes a Design and returns a HOD that returns it if the HOD is called empty', () => {
    const additionDesign = {
      Addition: testHOC('addition'),
      Addition2: testHOC('addition2'),
    };
    const additionHOD = extendDesign(additionDesign);
    const finalDesign = additionHOD();
    expect(Object.getOwnPropertyNames(finalDesign)[0]).toBe('Addition');
    expect(Object.getOwnPropertyNames(finalDesign)[1]).toBe('Addition2');
  });
  // tslint:disable-next-line: max-line-length
  it('takes X designs and returns an HOD that extend each before extending the HOD design', () => {
    const baseDesign = {
      Item1: testHOC('item1'),
    };
    const additionDesign1: FluidDesign = {
      Addition: testHOC('addition'),
      Addition2: testHOC('addition2'),
    };
    const additionDesign2: FluidDesign = {
      Addition3: testHOC('addition3'),
      Addition4: testHOC('addition4'),
    };
    const additionHOD = extendDesign(additionDesign1, additionDesign2);
    const finalDesign = additionHOD(baseDesign);
    expect(Object.getOwnPropertyNames(finalDesign)[0]).toBe('Item1');
    expect(Object.getOwnPropertyNames(finalDesign)[1]).toBe('Addition');
    expect(Object.getOwnPropertyNames(finalDesign)[2]).toBe('Addition2');
    expect(Object.getOwnPropertyNames(finalDesign)[3]).toBe('Addition3');
    expect(Object.getOwnPropertyNames(finalDesign)[4]).toBe('Addition4');
  });
  /*
    Test that
    extend(varyDesign(design)) = extend(varyDesign(design)())
    or
    extend(design1, varyDesign(design2, design3)) =
      extendDesign(design1, varyDesign(design2, design3)())
  */
  it(
    `will take a HOD generate a Design by executing that HOD with empty value and then return
    an HOD that extend the input Design with the generated one`,
    () => {
      const baseDesign = {
        Item1: testHOC('item1'),
      };
      const additionDesign1: FluidDesign = {
        Addition: testHOC('addition'),
        Addition2: testHOC('addition2'),
      };
      const additionDesign2: FluidDesign = {
        Addition3: testHOC('addition3'),
        Addition4: testHOC('addition4'),
      };
      const matrixedHOD = varyDesign(additionDesign1, additionDesign2);
      const additionHOD = extendDesign(matrixedHOD);
      const finalDesign = additionHOD(baseDesign);
      expect(Object.getOwnPropertyNames(finalDesign)).toStrictEqual([
        'Item1',
        'AdditionAddition3',
        'AdditionAddition4',
        'Addition2Addition3',
        'Addition2Addition4',
      ]);
    },
  );
});
