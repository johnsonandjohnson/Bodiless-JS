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

import { useContext, useState, useEffect } from 'react';
import { CarouselContext } from 'pure-react-carousel';
import { useListContext } from '@bodiless/components';

/**
 * implemented per pure-react-carousel doc
 * @see https://github.com/express-labs/pure-react-carousel#hooks-and-usecontext
 */
const useCarouselState = () => {
  const carouselContext = useContext(CarouselContext);
  const [state, setState] = useState(carouselContext.state);
  useEffect(() => {
    function onChange() {
      setState(carouselContext.state);
    }
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);
  return state;
};

const useCarouselCurrentSlide = () => useCarouselState().currentSlide;
/**
 * type gap in the contrib library
 * @todo suggest a patch to the contrib library
 */
// @ts-ignore
const useCarouselIsPlaying = () => useCarouselState().isPlaying;

const useCarouselSlideIndex = () => {
  const { currentItem, items } = useListContext();
  return items && currentItem ? items.indexOf(currentItem) : 0;
};

const useIsCarouselItemActive = () => {
  const currentSlide = useCarouselCurrentSlide();
  const itemIndex = useCarouselSlideIndex();
  return currentSlide === itemIndex;
};

export {
  useCarouselCurrentSlide,
  useIsCarouselItemActive,
  useCarouselIsPlaying,
  useCarouselSlideIndex,
};
