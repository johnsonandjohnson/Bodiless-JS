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

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { FetchChanges } from '../src/dist/RemoteChanges';
import { PullChanges } from '../dist/RemoteChanges';

const changes = {
  status: 200,
  data: {
    upstream: {
      branch: 'origin/feat/test',
      commits: ['Test Commit'],
      files: ['packages/gatsby-theme-bodiless/src/dist/RemoteChanges.tsx'],
    },
  },
};
const mockChangesClient = {
  getChanges: jest.fn(() => Promise.resolve(changes)),
  pull: jest.fn(() => Promise.resolve({ status: 200 })),
};
const noChanges = {
  status: 200,
  data: {
    upstream: {
      branch: 'null',
      commits: [],
      files: [],
    },
  },
};
const noChangesClient = {
  getChanges: jest.fn(() => Promise.resolve(noChanges)),
};
const nonPullableChanges = {
  status: 200,
  data: {
    upstream: {
      branch: 'null',
      commits: ['Test Commit'],
      files: ['packages/gatsby-theme-bodiless/src/dist/package-lock.json'],
    },
  },
};
const nonPullableChangesClient = {
  getChanges: jest.fn(() => Promise.resolve(nonPullableChanges)),
};

const mockFormApi = {
  setValue: jest.fn(),
};

describe('Fetch Changes component', () => {
  it('should show a spinner while a request to the back-end is processed', () => {
    const wrapper = mount(<FetchChanges client={mockChangesClient} />);
    expect(wrapper.find('.bodiless-spinner').length > 0).toBe(true);
  });
  it('should detect changes are available', async () => {
    const wrapper = mount(<FetchChanges client={mockChangesClient} formApi={mockFormApi} />);
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(wrapper.text()).toBe(
        'There are changes ready to be pulled. Click check (✓) to initiate.',
      );
    });
  });

  it('should detect changes are not available', async () => {
    const wrapper = mount(<FetchChanges client={noChangesClient} formApi={mockFormApi} />);
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(wrapper.text()).toBe('There are no changes to download.');
    });
  });

  it('should detect changes are available but cannot be pulled', async () => {
    const wrapper = mount(<FetchChanges client={nonPullableChangesClient} formApi={mockFormApi} />);
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(wrapper.text()).toBe(
        'Upstream changes are available but cannot be fetched via the UI.',
      );
    });
  });
});

describe('Pull Changes component', () => {
  it('should show a spinner while a request to the back-end is processed', () => {
    const wrapper = mount(<PullChanges client={mockChangesClient} formApi={mockFormApi} />);
    expect(wrapper.find('.bodiless-spinner').length > 0).toBe(true);
  });
  it('should pull changes', async () => {
    const wrapper = mount(<PullChanges client={mockChangesClient} formApi={mockFormApi} />);
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(wrapper.text()).toBe(
        'Operation completed.',
      );
    });
  });
});
