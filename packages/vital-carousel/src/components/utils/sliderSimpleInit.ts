/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/*
 * Sourced from https://github.com/barthy-koeln/scroll-snap-slider
 */
import { ScrollSnapSlider } from './ScrollSnapSlider';

// IMPORTANT If you edit this script, edit the sliderSimpleInitScript() below
export const sliderSimpleInit = (sliderSimpleElement: HTMLElement) => {
  try {
    const sliderDotCarousel = sliderSimpleElement.getElementsByClassName('scroll-snap-dot-slider');
    if (sliderDotCarousel.length !== 0) {
      const slidesDot = sliderSimpleElement.getElementsByClassName('scroll-snap-slide');
      const sliderDot = new ScrollSnapSlider({ element: sliderDotCarousel[0] });

      // Make the Indicators active or not
      const buttons = sliderSimpleElement.querySelectorAll('.indicators .indicator');
      const counters = sliderSimpleElement.querySelectorAll('.indicators .counter');
      counters[0].classList.toggle('-active');
      const setSelected = function (event: CustomEvent) {
        const slideElementIndex = event.detail;
        const slideElement = slidesDot[slideElementIndex];

        for (const button of Array.from(buttons)) {
          button.classList.toggle(
            '-active',
            (button as HTMLElement).dataset.index === (slideElement as HTMLElement).dataset.index
          );
        }
        for (const counter of Array.from(counters)) {
          counter.classList.toggle(
            '-active',
            (counter as HTMLElement).dataset.index === (slideElement as HTMLElement).dataset.index
          );
        }
      };

      // Add the listeners
      sliderDot.addEventListener<any>('slide-pass', setSelected);
      sliderDot.addEventListener<any>('slide-stop', setSelected);
    }

    // Thumb Carousel
    const sliderThumbCarousel = sliderSimpleElement.getElementsByClassName('scroll-snap-thumb-slider');
    if (sliderThumbCarousel.length !== 0) {
      const slidesThumb = sliderSimpleElement.getElementsByClassName('scroll-snap-slide');
      const sliderThumb = new ScrollSnapSlider({ element: sliderThumbCarousel[0] });

      // Only make the thumbs clickable not all dots
      const buttonsThumbs = sliderSimpleElement.querySelectorAll('.indicators .thumbs.indicator');
      for (const button of Array.from(buttonsThumbs)) {
        button.addEventListener('click', (event) => {
          const slideElementIndex = Array.prototype.slice
            .call(slidesThumb)
            .findIndex((item) => item.dataset.index === (button as HTMLElement).dataset.index);

          sliderThumb.slideTo(slideElementIndex);
        });
        button.addEventListener('keydown', (event) => {
          const slideElementIndex = Array.prototype.slice
            .call(slidesThumb)
            .findIndex((item) => item.dataset.index === (button as HTMLElement).dataset.index);

          sliderThumb.slideTo(slideElementIndex);
        });
      }

      /* Add the Control Arrows to thumbs */

      const NumThumbs = 4;
      for (const button of Array.from(buttonsThumbs)) {
        const buttonindex = (button as HTMLElement).dataset.index;
        button.classList.toggle(
          '-peek',
          Number(buttonindex) === (NumThumbs)
        );
        button.classList.toggle(
          '-hide',
          Number(buttonindex) > (NumThumbs - 1)
        );
      }

      const prev = document.querySelector('.thumbcontrols .arrow.-prev');
      const next = document.querySelector('.thumbcontrols .arrow.-next');
      (prev as HTMLElement).classList.toggle('-disabled');

      const updateArrows = function (event: CustomEvent) {
        const slideElementIndex = event.detail;

        if (buttonsThumbs.length > NumThumbs) {
          if (slideElementIndex + NumThumbs <= buttonsThumbs.length) {
            buttonsThumbs[slideElementIndex-1]?.classList.toggle('-hide');
            if (slideElementIndex !== 0) {
              buttonsThumbs[slideElementIndex+NumThumbs-1]?.classList.toggle('-hide');
              buttonsThumbs[slideElementIndex+NumThumbs]?.classList.toggle('-peek');
              buttonsThumbs[slideElementIndex+NumThumbs-1]?.classList.toggle('-peek');
            }
          }
        }

        (prev as HTMLElement).classList.toggle('-disabled', slideElementIndex === 0);
        (next as HTMLElement).classList.toggle('-disabled', slideElementIndex === (buttonsThumbs.length-1));
      };

      // Add the listeners
      (prev as HTMLElement).addEventListener<any>('click', () => {
        sliderThumb.slideTo(sliderThumb.slide - 1);
      });
      (next as HTMLElement).addEventListener<any>('click', () => {
        sliderThumb.slideTo(sliderThumb.slide + 1);
      });
      sliderThumb.addEventListener<any>('slide-pass', updateArrows);
    }
  } catch (e) {
    //
  }
};

// Repeat of above.....  if above is edited, update this version without typescript
export const sliderSimpleInitScript = `
const sliderSimpleInit = (sliderSimpleElement) => {
  try {
    const sliderDotCarousel = sliderSimpleElement.getElementsByClassName('scroll-snap-dot-slider');
    if (sliderDotCarousel.length !== 0) {
      const slidesDot = sliderSimpleElement.getElementsByClassName('scroll-snap-slide');
      const sliderDot = new ScrollSnapSlider({ element: sliderDotCarousel[0] });

      // Make the Indicators active or not
      const buttons = sliderSimpleElement.querySelectorAll('.indicators .indicator');
      const counters = sliderSimpleElement.querySelectorAll('.indicators .counter');
      counters[0].classList.toggle('-active');
      const setSelected = function (event) {
        const slideElementIndex = event.detail;
        const slideElement = slidesDot[slideElementIndex];

        for (const button of buttons) {
          button.classList.toggle(
            '-active',
            button.dataset.index === slideElement.dataset.index
          );
        }
        for (const counter of counters) {
          counter.classList.toggle(
            '-active',
            counter.dataset.index === slideElement.dataset.index
          );
        }
      };

      // Add the listeners
      sliderDot.addEventListener('slide-pass', setSelected);
      sliderDot.addEventListener('slide-stop', setSelected);
    }

    // Thumb Carousel
    const sliderThumbCarousel = sliderSimpleElement.getElementsByClassName('scroll-snap-thumb-slider');
    if (sliderThumbCarousel.length !== 0) {
      const slidesThumb = sliderSimpleElement.getElementsByClassName('scroll-snap-slide');
      const sliderThumb = new ScrollSnapSlider({ element: sliderThumbCarousel[0] });

      // Only make the thumbs clickable not all dots
      const buttonsThumbs = sliderSimpleElement.querySelectorAll('.indicators .thumbs.indicator');
      for (const button of buttonsThumbs) {
        button.addEventListener('click', (event) => {
          const slideElementIndex = Array.prototype.slice
            .call(slidesThumb)
            .findIndex((item) => item.dataset.index === button.dataset.index);

          sliderThumb.slideTo(slideElementIndex);
        });
        button.addEventListener('keydown', (event) => {
          const slideElementIndex = Array.prototype.slice
            .call(slidesThumb)
            .findIndex((item) => item.dataset.index === button.dataset.index);

          sliderThumb.slideTo(slideElementIndex);
        });
      }

      /* Add the Control Arrows to thumbs */

      const NumThumbs = 4;
      for (const button of buttonsThumbs) {
        const buttonindex = button.dataset.index;
        button.classList.toggle(
          '-peek',
          Number(buttonindex) === (NumThumbs)
        );
        button.classList.toggle(
          '-hide',
          Number(buttonindex) > (NumThumbs - 1)
        );
      }

      const prev = document.querySelector('.thumbcontrols .arrow.-prev');
      const next = document.querySelector('.thumbcontrols .arrow.-next');
      prev.classList.toggle('-disabled');

      const updateArrows = function (event) {
        const slideElementIndex = event.detail;

        if (buttonsThumbs.length > NumThumbs) {
          if (slideElementIndex + NumThumbs <= buttonsThumbs.length) {
            buttonsThumbs[slideElementIndex-1]?.classList.toggle('-hide');
            if (slideElementIndex !== 0) {
              buttonsThumbs[slideElementIndex+NumThumbs-1]?.classList.toggle('-hide');
              buttonsThumbs[slideElementIndex+NumThumbs]?.classList.toggle('-peek');
              buttonsThumbs[slideElementIndex+NumThumbs-1]?.classList.toggle('-peek');
            }
          }
        }

        prev.classList.toggle('-disabled', slideElementIndex === 0);
        next.classList.toggle('-disabled', slideElementIndex === (buttonsThumbs.length-1));
    };

    // Add the listeners
    prev.addEventListener('click', () => {
      sliderThumb.slideTo(sliderThumb.slide - 1);
    });
    next.addEventListener('click', () => {
      sliderThumb.slideTo(sliderThumb.slide + 1);
    });
    sliderThumb.addEventListener('slide-pass', updateArrows);
  }

  } catch(e) {
    //
  }
};
`;
