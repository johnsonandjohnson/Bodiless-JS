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
import Downloader from '../src/downloader';
/* eslint-enable import/first */

const mockRetryRequestDefault = () => ({
  on: (input: string, cb: Function) => {
    if (input === 'complete') {
      cb();
    }
    return mockRetryRequestDefault();
  },
});

jest.mock('retry-request', () => ({
  __esModule: true,
  default: jest.fn(() => mockRetryRequestDefault()),
}));

describe('assets download', () => {
  test('external assests are not downloaded', async () => {
    const pageUrl = 'https://localhost';
    const downloadPath = 'static';
    const downloader = new Downloader(pageUrl, downloadPath);
    const assets = [
      'https://localhost/test1.css',
      '/test2.css',
      'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
      'https://localhost/gatsby.png',
      'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      'https://localhost/test1.js',
      '/test2.js',
      'https://code.jquery.com/jquery-3.4.1.min.js',
    ];
    // @ts-ignore since we are mocking private method
    const downloadFileMock = jest.spyOn(downloader, 'downloadFile').mockImplementation(() => true);
    await downloader.downloadFiles(assets);
    expect(downloadFileMock).toHaveBeenCalledTimes(5);
    expect(downloadFileMock).toHaveBeenCalledWith('https://localhost/test1.css');
    expect(downloadFileMock).toHaveBeenCalledWith('https://localhost/test2.css');
    expect(downloadFileMock).toHaveBeenCalledWith('https://localhost/gatsby.png');
    expect(downloadFileMock).toHaveBeenCalledWith('https://localhost/test1.js');
    expect(downloadFileMock).toHaveBeenCalledWith('https://localhost/test2.js');
  });

  test('Download returns correct path', async () => {
    const pageUrl = 'https://localhost';
    const downloadPath = 'static';
    const downloader = new Downloader(pageUrl, downloadPath);
    const assets = [
      'https://localhost/path/to/gatsby.png',
      'https://external.site.com/images/not-exists.jpg',
    ];
    try {
      const result = await downloader.downloadFiles(assets);
      expect(result.length).toBe(1);
      const { url, targetPath } = result[0];
      expect(url).toBe('https://localhost/path/to/gatsby.png');
      expect(targetPath).toBe(`${downloadPath}/path/to/gatsby.png`);
    } catch (e) {
      throw new Error('Download failed');
    }
  });
});
