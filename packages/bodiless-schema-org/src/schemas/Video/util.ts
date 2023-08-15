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

import { DataStructureSchemaProps } from '../../types';
import { getSchemaSourceData } from '../../util';

const part = 'snippet,statistics,contentDetails';
const googleYTApiKey = process.env.BODILESS_GOOGLE_YOUTUBE_API_KEY || null;

/**
 * getYouTubeIds applies a Regex to separate the video ID for use in
 * the API.
 *
 * @param url An array of strings.
 *
 * @return An array with all the IDs.
 */
const getYouTubeIds = (url: Array<string>) => {
  const youTubeIds = url.map(element => {
    const regex = /[a-zA-Z0-9_-]{11}/gm;
    const id = regex.exec(element);

    if (!id) return null;
    return id[0];
  });
  return youTubeIds;
};

/**
 * getYouTubeData receives an array containing all types
 * and Hook setStructuredData to set the values
 *
 * @param schemaSourceKeys  An array of DataStructureSchemaProps type.
 *
 * getSchemaSourceData passes the type to be searched in the html
 * and returns the url of all videos listed on the screen
 * Api call returns all data provided if null returns nothing
 *
 * @param schemaSourceKeys An array of DataStructureSchemaProps type.
 */

// eslint-disable-next-line consistent-return
export const getYouTubeSchema = async (schemaSourceKeys: Array<DataStructureSchemaProps>) => {
  const {
    'youtube-iframe': youTubeSources,
  } = getSchemaSourceData(schemaSourceKeys);
  const ids = getYouTubeIds(youTubeSources);

  if (googleYTApiKey != null) {
    let data;

    try {
      const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${googleYTApiKey}&part=${part}&id=${ids}`);
      data = await res.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Unable to retrieve Youtube API data: ${data}.`);
      data = null;
    }

    if (data == null || data.error != null) {
      // eslint-disable-next-line no-console
      console.error(`Unable to retrieve Youtube API data: ${data}.`);
    }
    const youTubeVideosData = data.items;
    const schemaYouTube = {
      itemListElement: [] as Record<string, object | string | number>[],
    };
    // @TODO: create a type to video, this type should follow this documentation:
    // https://developers.google.com/search/docs/advanced/structured-data/video
    schemaYouTube.itemListElement = youTubeVideosData.map((video: any, index: number) => ({
      '@type': 'VideoObject',
      position: index,
      name: video.snippet.title,
      description: video.snippet.description,
      thumbnailUrl: video.snippet.thumbnails.standard != null
        ? video.snippet.thumbnails.standard.url
        : video.snippet.thumbnails.default.url,
      uploadDate: video.snippet.publishedAt,
      duration: video.contentDetails.duration,
      contentUrl: `https://youtube.com/watch/?v=${video.id}`,
      embedUrl: `https://youtube.com/watch/?v=${video.id}`,
      url: `https://youtube.com/watch/?v=${video.id}`,
      regionsAllowed: 'NL',
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: { '@type': 'WatchAction' },
        userInteractionCount: video.statistics.viewCount,
      },
    }));
    return schemaYouTube;
  }

  // eslint-disable-next-line no-console
  console.warn(`YouTube API key missing or invalid: ${googleYTApiKey}. No schema will be generated for these video ids: ${ids?.join(', ')}.`);
};
