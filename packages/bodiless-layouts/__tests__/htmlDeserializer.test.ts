/**
 * Copyright © 2021 Johnson & Johnson
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

import { deserializeHtml } from '../src/deserializers';
import { createListDeserializer } from '../src/deserializers/listDeserializer';
import { createDefaultDeserializer } from '../src/deserializers/defaultDeserializers';

const deserializers = [
  createListDeserializer('List'),
  createDefaultDeserializer('RTE'),
];

describe('htmlDeserializer', () => {
  describe('when html without list is passed', () => {
    it('creates a single flow container item', () => {
      const inputHtml = '<div>test</div>';
      const flowContainerData = deserializeHtml(inputHtml, deserializers);
      expect(flowContainerData[''].items.length).toBe(1);
      expect(flowContainerData[''].items[0].type).toBe('RTE');
    });
  });
  describe('when html containing list is passed', () => {
    it('creates multiple flow container items for case1', () => {
      const inputHtml = `
        <div>
          <h1>Test Header</h1>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
          <div>test div</div>
        </div>
      `;
      const flowContainerData = deserializeHtml(inputHtml, deserializers);
      expect(flowContainerData[''].items.length).toBe(3);
      expect(flowContainerData[''].items[0].type).toBe('RTE');
      expect(flowContainerData[''].items[1].type).toBe('List');
      expect(flowContainerData[''].items[2].type).toBe('RTE');
    });
    it('creates multiple flow container items for case2', () => {
      const inputHtml = `
        <div>
          <h1>Test Header</h1>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
          <div>test div</div>
          <div>
            <ol>
              <li>Item 1</li>
              <li>Item 2</li>
            </ol>
          </div>
          <div>test div2</div>
        </div>
      `;
      const flowContainerData = deserializeHtml(inputHtml, deserializers);
      expect(flowContainerData[''].items.length).toBe(5);
      expect(flowContainerData[''].items[0].type).toBe('RTE');
      expect(flowContainerData[''].items[1].type).toBe('List');
      expect(flowContainerData[''].items[2].type).toBe('RTE');
      expect(flowContainerData[''].items[3].type).toBe('List');
      expect(flowContainerData[''].items[4].type).toBe('RTE');
    });
    it('creates multiple flow container items for case3', () => {
      const inputHtml = `
        <div>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
          <ol>
            <li>Item 1</li>
            <li>Item 2</li>
          </ol>
        </div>
      `;
      const flowContainerData = deserializeHtml(inputHtml, deserializers);
      expect(flowContainerData[''].items.length).toBe(2);
      expect(flowContainerData[''].items[0].type).toBe('List');
      expect(flowContainerData[''].items[1].type).toBe('List');
    });
    it('creates multiple flow container items for case4', () => {
      const inputHtml = `
        <div>
          <h1>Test Header</h1>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
          <div>test div</div>
          <div>
            <div>test div2</div>
            <ol>
              <li>Item 1</li>
              <li>Item 2</li>
            </ol>
            <div>test div3</div>
          </div>
          <div>test div4</div>
        </div>
      `;
      const flowContainerData = deserializeHtml(inputHtml, deserializers);
      expect(flowContainerData[''].items.length).toBe(7);
      expect(flowContainerData[''].items[0].type).toBe('RTE');
      expect(flowContainerData[''].items[1].type).toBe('List');
      expect(flowContainerData[''].items[2].type).toBe('RTE');
      expect(flowContainerData[''].items[3].type).toBe('RTE');
      expect(flowContainerData[''].items[4].type).toBe('List');
      expect(flowContainerData[''].items[5].type).toBe('RTE');
      expect(flowContainerData[''].items[6].type).toBe('RTE');
    });
  });
});
