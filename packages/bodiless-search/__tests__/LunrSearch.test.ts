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

import { Builder } from 'lunr';
import LunrSearch from '../src/LunrSearch';

jest.genMockFromModule('lunr');
jest.mock('lunr');
const mockBuilder = {
  ref: jest.fn(),
  field: jest.fn(),
  add: jest.fn(),
  build: jest.fn(),
};
(Builder as jest.Mock).mockImplementation(() => mockBuilder);

const documents = [
  {
    id: 'first',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    body:
      'Sed lacinia egestas tellus, at consequat dolor consectetur nec.',
    link: '',
  },
  {
    id: 'second',
    title:
      'Quisque interdum quam non mauris pretium, et fringilla magna tempor.',
    body:
      'Etiam sit amet odio elementum, vulputate velit in, consectetur tortor.',
    link: '/1',
  },
  {
    id: 'third',
    title:
      'Morbi nisi dui, efficitur et tristique sit amet, porttitor vel leo. Sed eleifend sapien sed semper laoreet.',
    body:
      'Cras vulputate tortor eget massa pharetra, ac volutpat lectus pulvinar.',
    link: '/2',
  },
];

describe('LunrSearch createIndex', () => {
  beforeEach(() => {
    (Builder as jest.Mock).mockClear();
  });
  it('throws Error if no documents added before createIndex', () => {
    const conf = {
      ref: 'id',
      fields: [],
    };
    const lunrSearch = new LunrSearch();
    lunrSearch.setIndexConfig(conf);
    expect(() => lunrSearch.createIndex()).toThrow(
      /There are no documents to be indexed/,
    );
  });

  it('returns Lunr index', () => {
    const conf = {
      ref: 'id',
      fields: [{ name: 'text' }, { name: 'description' }],
    };
    const lunrSearch = new LunrSearch();
    lunrSearch.setIndexConfig(conf);
    lunrSearch.addDocuments(documents);
    lunrSearch.createIndex();
    expect(mockBuilder.ref).toHaveBeenCalledTimes(1);
    expect(mockBuilder.field).toHaveBeenCalledTimes(2);
    expect(mockBuilder.add).toHaveBeenCalledTimes(3);
  });
});
