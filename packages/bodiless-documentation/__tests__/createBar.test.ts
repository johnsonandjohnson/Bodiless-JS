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

import { createNavBar } from '../lib/createBar';

describe('createNav', () => {
  it('Should add a * [Name](NAME) line for each top elment', () => {
    const paths = {
      'test1.md': 'test1.md',
    };
    const navBar = createNavBar(paths); // createNavbar(paths);
    expect(navBar).toBe('  * [Test1](/test1)\n');
  });
  it('makes names more friendly', () => {
    const paths = {
      'TestPascal.md': 'testpascal.md',
      'Test_Snake.md': 'testsnake.md',
    };
    const navBar = createNavBar(paths);
    expect(navBar).toMatch(/\[Test Pascal\]\(\/TestPascal\)/);
    expect(navBar).toMatch(/\[Test Snake\]\(\/Test_Snake\)/);
  });
  it('should add an * [Parent](README.md) for any readme item', () => {
    const paths = {
      test1: {
        'README.md': 'placetogo.md',
      },
    };
    const navBar = createNavBar(paths); // createNavbar(paths);
    expect(navBar).toBe('  * [Test1](/test1/)\n');
  });
  it('Should add a non link if there is no README in the folder', () => {
    const paths = {
      test1: {
        test2: 'something.md',
      },
    };
    const navBar = createNavBar(paths); // createNavbar(paths);
    expect(navBar).toBe('  * Test1\n    * [Test2](/test1/test2)\n');
  });
  it('should not add a 3rd level item', () => {
    const paths = {
      test1: {
        test2: {
          'README.md': 'README.md',
          test3: {
            'README.md': 'README.md',
          },
        },
      },
    };
    const navBar = createNavBar(paths); // createNavbar(paths);
    expect(navBar).not.toMatch(/\[test3\]/);
  });
  it('should add a 3rd level item if no parent links', () => {
    const paths = {
      test1: {
        test2: {
          test3: {
            'README.md': 'README.md',
          },
        },
      },
    };
    const navBar = createNavBar(paths); // createNavbar(paths);
    expect(navBar).toMatch(/\[Test3\]/);
  });
  it('Should add an indent and the * (Name)(PARENTS/NAME) for any second level item', () => {
    const paths = {
      test1: {
        'test2.md': 'placewearegoing.md',
      },
    };
    const navBar = createNavBar(paths); // createNavbar(paths);
    expect(navBar).toBe('  * Test1\n    * [Test2](/test1/test2)\n');
  });
  it('Should add an indent for any second level item that is another folder', () => {
    const paths = {
      test1: {
        test2: {
          'README.md': 'placewearegoing.md',
        },
      },
    };
    const navBar = createNavBar(paths); // createNavbar(paths);
    expect(navBar).toBe('  * Test1\n    * [Test2](/test1/test2/)\n');
  });
  it('Should ignore assets', () => {
    const paths = {
      test1: 'image.png',
    };
    const navBar = createNavBar(paths); // createNavbar(paths);
    expect(navBar).toBe('');
  });
  it('Should ignore empty folders', () => {
    const paths = {
      test1: {
        test2: 'image.png',
      },
    };
    const navBar = createNavBar(paths); // createNavbar(paths);
    expect(navBar).toBe('');
  });
});
