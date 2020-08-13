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

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import {
  FetchChanges,
  PullChanges,
  ResponseData,
} from '../src/dist/RemoteChanges';

const mockBackendResponse = (data: ResponseData, status = 200) => ({
  status,
  data: {
    upstream: {
      branch: 'null',
      ...data.upstream,
    },
    production: {
      branch: 'origin/master',
      ...data.production,
    },
    local: {
      branch: 'origin/test',
      ...data.local,
    },
  },
});

const mockClient = (responseData: ResponseData) => ({
  getChanges: jest.fn(() => Promise.resolve(mockBackendResponse(responseData))),
  pull: jest.fn(() => Promise.resolve({ status: 200 })),
  commit: jest.fn(() => Promise.resolve({ status: 200 })),
  getConflicts: () => jest.fn(() => Promise.resolve({ status: 200 })),
  getLatestCommits: () => jest.fn(() => Promise.resolve({ status: 200 })),
  reset: () => jest.fn(() => Promise.resolve({ status: 200 })),
});

const mockFormApi = {
  setValue: jest.fn(),
  getValue: jest.fn(),
};

const defaultBranchData = {
  branch: null,
  commits: [],
  files: [],
};

const defaultResponse = {
  local: defaultBranchData,
  production: defaultBranchData,
  upstream: defaultBranchData,
};

const noChangesClient = mockClient(defaultResponse);

const mockChangesClient = mockClient({
  ...defaultResponse,
  production: {
    branch: 'origin/master',
    commits: ['Test Commit'],
    files: ['packages/gatsby-theme-bodiless/src/dist/RemoteChanges.tsx'],
  },
});

const nonPullableChangesClient = mockClient({
  ...defaultResponse,
  production: {
    branch: 'origin/master',
    commits: ['a'],
    files: ['packages/gatsby-theme-bodiless/src/dist/package-lock.json'],
  },
});

describe('Fetch Changes component', () => {
  it('should show a spinner while a request to the back-end is processed', () => {
    const wrapper = mount(
      <FetchChanges
        client={mockChangesClient}
        formApi={mockFormApi}
        notifyOfChanges={jest.fn()}
      />,
    );
    expect(wrapper.find('.bodiless-spinner').length > 0).toBe(true);
  });
  it('should detect changes are available', async () => {
    const wrapper = mount(
      <FetchChanges
        client={mockChangesClient}
        formApi={mockFormApi}
        notifyOfChanges={jest.fn()}
      />,
    );
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(wrapper.text()).toBe(
        'There are updates available to be pulled. Click check (✓) to initiate.',
      );
    });
  });

  it('should detect changes are not available', async () => {
    const wrapper = mount(
      <FetchChanges
        client={noChangesClient}
        formApi={mockFormApi}
        notifyOfChanges={jest.fn()}
      />,
    );
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(wrapper.text()).toBe('There are no changes to download.');
    });
  });

  it('should detect changes are available but cannot be pulled', async () => {
    const wrapper = mount(
      <FetchChanges
        client={nonPullableChangesClient}
        formApi={mockFormApi}
        notifyOfChanges={jest.fn()}
      />,
    );
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(wrapper.text()).toMatch(/contact your development team for assistance. \(code 1002\)/);
    });
  });
});

describe('Pull Changes component', () => {
  it('should show a spinner while a request to the back-end is processed', () => {
    const wrapper = mount(
      <PullChanges
        client={mockChangesClient}
        formApi={mockFormApi}
        notifyOfChanges={jest.fn()}
      />,
    );
    expect(wrapper.find('.bodiless-spinner').length > 0).toBe(true);
  });
  it('should pull changes', async () => {
    const wrapper = mount(
      <PullChanges
        client={mockChangesClient}
        formApi={mockFormApi}
        notifyOfChanges={jest.fn()}
      />,
    );
    return new Promise(resolve => setImmediate(resolve)).then(() => {
      wrapper.update();
      expect(wrapper.text()).toBe('Operation complete, page will refresh.');
    });
  });
});
