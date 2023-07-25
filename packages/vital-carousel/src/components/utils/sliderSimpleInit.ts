/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/*
 * Sourced from https://github.com/barthy-koeln/scroll-snap-slider
 */

export const sliderSimpleInitScript = `

const sliderSimpleInit = (sliderSimpleElement) => {
  try {
    const slider = sliderSimpleElement.getElementsByClassName('scroll-snap-slider'); 
    const slides = sliderSimpleElement.getElementsByClassName(
      'scroll-snap-slide'
    );
    const sliderSimple = new ScrollSnapSlider({ element: slider[0] });
  
    const buttons = sliderSimpleElement.querySelectorAll('.indicators .indicator');
    const buttonsThumbs = sliderSimpleElement.querySelectorAll('.indicators .thumbs.indicator');
  
    const setSelected = function (event) {
      const slideElementIndex = event.detail;
      const slideElement = slides[slideElementIndex];
  
      for (const button of buttons) {
        const isActive = button.classList.toggle(
          '-active',
          button.dataset.index === slideElement.dataset.index
        );
      }
    };
  
    // Only make the thumbs clickable not all dots
    for (const button of buttonsThumbs) {
      button.addEventListener('click', (event) => {
        const slideElementIndex = Array.prototype.slice
          .call(slides)
          .findIndex((item) => item.dataset.index === button.dataset.index);
  
        sliderSimple.slideTo(slideElementIndex);
      });
      button.addEventListener('keydown', (event) => {
        const slideElementIndex = Array.prototype.slice
        .call(slides)
        .findIndex((item) => item.dataset.index === button.dataset.index);

      sliderSimple.slideTo(slideElementIndex);

      });
    }
  
    sliderSimple.addEventListener('slide-pass', setSelected);
    sliderSimple.addEventListener('slide-stop', setSelected);

    /* Control Arrows */

    const NumThumbs = 4;
    
    const thumbbuttons = document.querySelectorAll(".indicators .thumbs.indicator");
    for (const button of thumbbuttons) {
        const show = button.classList.toggle(
          "-hide",
          button.dataset.index > (NumThumbs - 1)
        );
    }
    
    const prev = document.querySelector(".thumbcontrols .arrow.-prev");
    const next = document.querySelector(".thumbcontrols .arrow.-next");
  
    const updateArrows = function (event) {
      const slideElementIndex = event.detail;
      
      if (thumbbuttons.length > NumThumbs) {
        if (slideElementIndex + NumThumbs < thumbbuttons.length) {
          if (slideElementIndex === 0) { 
            // buttons[slideElementIndex].classList.toggle("-hide");
          } else {
            thumbbuttons[slideElementIndex-1].classList.toggle("-hide");
          }
          thumbbuttons[slideElementIndex+NumThumbs].classList.toggle("-hide");  
        }
      }
      
      
      prev.classList.toggle("-disabled", slideElementIndex === 0);
      next.classList.toggle("-disabled", slideElementIndex === (thumbbuttons.length-1));
      
    };
  
    prev.addEventListener("click", function () {
      sliderSimple.slideTo(sliderSimple.slide - 1);
    });
  
    next.addEventListener("click", function () {
      sliderSimple.slideTo(sliderSimple.slide + 1);
    });
    
    sliderSimple.addEventListener('slide-pass', updateArrows)

  } catch(e) {
    //
  }
};
`;
