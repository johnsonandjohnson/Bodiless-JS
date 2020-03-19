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
import { shallow } from 'enzyme';
import CommitsList from '../src/dist/CommitsList';

const mockedGitLogOutput = `
  hash 1
  author name 1
  date 1
  commit message 1

  hash 2
  author name 2
  date 2
  commit message 2
`;

const mockedClient = {
  getLatestCommits: () => ({
    data: {
      stdout: mockedGitLogOutput,
      stderr: '',
    },
  }),
};

describe('CommitsList component', () => {
  // temporary comment it out - needs review when global overlay is done
  // it('should show a loader icon while a request to the back-end is processed', () => {
  //   const wrapper = shallow(<CommitsList client={mockedClient} />);
  //   expect(wrapper.text().includes('Loading')).toBe(true);
  // });
  it('should render a list of selectable items once a responce is recieved', async () => {
    const wrapper = shallow(<CommitsList client={mockedClient} />);
    const instance = wrapper.instance();
    // The condition below is just to solve TS2722 error:
    // "Cannot invoke an object which is possibly 'undefined'".
    // We actually expect that componentDidMount is always defined.
    if (instance && instance.componentDidMount) {
      await instance.componentDidMount();
      wrapper.update();
      expect(wrapper.find('input[type="radio"]').length > 0).toBe(true);
    }
  });
});
