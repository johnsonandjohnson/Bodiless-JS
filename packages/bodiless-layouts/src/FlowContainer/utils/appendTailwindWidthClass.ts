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

import { flowRight } from 'lodash';

export type Tuple = {
  width: number,
  className: string,
  media: string,
};
type SnapDataProps = {
  width?: number,
  className: string,
  matchMedia?: Function,
};
type SnapDataReturn = {
  width: number,
  className: string,
};
type WithTuples = (tuples: Tuple[]) => Tuple[];
export type SnapData = (props: SnapDataProps) => SnapDataReturn;

/**
 * Curry function that returns a withTuple to be used a snapOptions function.
 * @param media: The media query of the tuple
 * @param width: The width of the Tuple
 * @param className the class name of the tuple
 * @returns: a Tuple with the given information
 * @see snapOptions
 */
const withTuple = (media: string) => (width: number) => (className: string): WithTuples => (
  (tuples: Tuple[]) => (
    [{ media, width, className }, ...tuples]
  )
);

type Config = {
  theme: {
    screens: { [key: string]: string},
    width: { [key: string]: string},
  },
};
/**
 * withTailwindClasses returns a withTuple function that take the tailwind class and creates
 * tuples for each one of them.
 * @param tailwindConfig The Tailwind config to use for extraction of size data
 * @param classes: THe tailwind classes
 */
const withTailwindClasses = (tailwindConfig: Config) => (classes: string): WithTuples => (
  (tuples: Tuple[]) => [
    ...classes.split(' ').map((className: string) => {
      const [mediaPrefix, widthClassName] = (className.match(':') ? className : `:${className}`)
        .split(':');
      const widthSuffix = widthClassName.replace(/^w-/, '');
      // If we do not have the screen then we move forward with no screen
      // tslint:disable-next-line: max-line-length
      const media = `(min-width: ${mediaPrefix ? tailwindConfig.theme.screens[mediaPrefix] : '0px'})`;
      const width = parseInt(tailwindConfig.theme.width[widthSuffix], 10);
      return {
        media,
        width,
        className,
      };
    }),
    ...tuples,
  ]
);
/**
 * getWidths extracts all of the unquie widths from an array of withTuples
 * @param options The withTuple to be inspected
 */
const getWidths = (options: Tuple[]) => (
  options
    .map(item => item.width)
    .reduce(
      (unique, item) => (
        unique.includes(item) ? unique : [...unique, item]
      ),
      [] as number[],
    )
);
/**
 * getClassNames extracts all of the unquie classNames from an array of withTuples
 * @param options The withTuple to be inspected
 */
const getClassNames = (options: Tuple[]) => (
  options
    .map(item => item.className)
    .reduce(
      (unique, item) => (
        unique.includes(item) ? unique : [...unique, item]
      ),
      [] as string[],
    )
);
/**
 * getMedias extracts all of the unquie widths from an array of withTuples
 * @param options The withTuple to be inspected
 */
const getMedias = (options: Tuple[]) => (
  options
    .map(item => item.media)
    .reduce(
      (unique, item) => (
        unique.includes(item) ? unique : [item, ...unique]
      ),
      [] as string[],
    )
);

const getMediaMatch = (matchMedia: Function) => (medias: string[]) => (
  medias.reduceRight(
    // walk though each of the media strings and return the last true one
    (acc: string, media) => (
      matchMedia(media).matches ? media : acc
    ),
    '',
  )
);
const filterByMedia = (media: string) => (tuples: Tuple[]) => (
  tuples.filter(item => item.media === media)
);
const filterByWidth = (width: number) => (tuples: Tuple[]) => (
  tuples.filter(item => item.width === width)
);
// tslint:disable-next-line: ter-arrow-parens
const getSnapFrom = (...withTuples: WithTuples[]):SnapData => props => {
  const {
    width: currentWidth,
    className: currentClassName,
    matchMedia: matchMediaRaw,
  } = props;
  const tuples = flowRight(...withTuples)([]);
  const matchMedia = matchMediaRaw || window.matchMedia;
  const currentMedia = getMediaMatch(matchMedia)(getMedias(tuples));
  const currentMediaTuples = filterByMedia(currentMedia)(tuples);
  const currentTuple = currentMediaTuples.find(tuple => (
    currentClassName.split(' ').includes(tuple.className)
  ));
  // Find the first width for which the input width is smaller
  // If no with pass then use the one from our current class
  const width = typeof currentWidth !== 'undefined'
    ? getWidths(currentMediaTuples).find(w => w >= currentWidth) || 100
    : (currentTuple && currentTuple.width) || 100;
  const currentWidthTuples = filterByWidth(width)(currentMediaTuples);
  const className = currentClassName.split(' ')
    // remove all class that relate to the media query
    .filter((item: string) => (
      !getClassNames(currentMediaTuples).includes(item)
    ))
    // add the class that is for the current width
    .concat(currentWidthTuples.length > 0 ? currentWidthTuples[0].className : '')
    .join(' ');
  return { width, className };
};
const defaultSnapData = getSnapFrom(
  withTuple('(min-width: 0px)')(100)('w-full'),
  withTuple('(min-width: 576px)')(25)('sm:w-1/4'),
  withTuple('(min-width: 576px)')(33.33)('sm:w-1/3'),
  withTuple('(min-width: 576px)')(50)('sm:w-1/2'),
  withTuple('(min-width: 576px)')(66.66)('sm:w-2/3'),
  withTuple('(min-width: 576px)')(75)('sm:w-3/4'),
  withTuple('(min-width: 576px)')(100)('sm:w-full'),
  withTuple('(min-width: 992px)')(25)('lg:w-1/4'),
  withTuple('(min-width: 992px)')(33.33)('lg:w-1/3'),
  withTuple('(min-width: 992px)')(50)('lg:w-1/2'),
  withTuple('(min-width: 992px)')(66.66)('lg:w-2/3'),
  withTuple('(min-width: 992px)')(75)('lg:w-3/4'),
  withTuple('(min-width: 992px)')(100)('lg:w-full'),
);
type DefautlClasses = (classes:string) => (snapData: SnapData) => String;

const asDefaultClasses:DefautlClasses = (classes:string) => () => classes;
export {
  getSnapFrom,
  withTuple,
  defaultSnapData,
  withTailwindClasses,
  asDefaultClasses,
};
