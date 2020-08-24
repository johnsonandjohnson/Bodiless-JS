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

import React, { useState, useEffect } from 'react';
import { getUI, useEditContext } from '@bodiless/core';
import { Spinner } from '@bodiless/ui';

type Commit = {
  hash: string,
  date: string,
  author: string,
  title: string,
};

type ResponseData = {
  stdout: string,
  stderr: string,
};

const renderSelectableList = (commits: Array<Commit>) => {
  const options = commits.map((commit: Commit) => {
    const {
      hash,
      date,
      author,
      title,
    } = commit;
    return (
      <label
        className="bl-flex bl-mb-grid-3"
        key={hash}
        htmlFor={hash}
      >
        <input
          id={hash}
          type="radio"
          name="commits"
          value={hash}
          className="bl-m-grid-3"
        />
        <div>
          {date}
          <br />
          {author}
          <br />
          {title}
          <br />
        </div>
      </label>
    );
  });
  return (
    <div className="bl-h-xl-grid-1 bl-overflow-auto bl-max-w-xl-grid-4">
      {options}
    </div>
  );
};

const handleResponse = (responseData: ResponseData) => {
  const { stdout, stderr } = responseData;
  if (stderr) {
    return stderr;
  }
  const commits = stdout.split('\n\n').map((commit: string) => {
    const {
      0: hash,
      1: date,
      2: author,
      3: title,
    } = commit.split('\n');
    return {
      hash,
      date,
      author,
      title,
    };
  });
  return renderSelectableList(commits);
};

type Props = {
  client: any,
  ui: any,
};

const WrappedSpinner = () => (
  <div className="bl-pt-5">
    <Spinner color="bl-bg-white" />
  </div>
);

const CommitsList = ({ client, ui }: Props) => {
  const { ComponentFormWarning } = getUI(ui);
  const [state, setState] = useState<{ content: any }>({ content: <WrappedSpinner /> });
  const context = useEditContext();

  useEffect(() => {
    (async () => {
      try {
        context.showPageOverlay({
          hasSpinner: false,
          maxTimeoutInSeconds: 10,
        });
        const response = await client.getLatestCommits();
        setState({
          content: handleResponse(response.data),
        });
        context.hidePageOverlay();
      } catch (error) {
        const errorMessage = error.message || 'An unexpected error has occurred';
        setState({
          content: <ComponentFormWarning>{errorMessage}</ComponentFormWarning>,
        });
        context.hidePageOverlay();
      }
    })();
  }, []);

  const { content } = state;
  return content;
};

export default CommitsList;
