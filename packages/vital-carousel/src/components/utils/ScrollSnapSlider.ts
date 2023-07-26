/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/*
 * Sourced from https://github.com/barthy-koeln/scroll-snap-slider
 */
type ScrollSnapSliderOptions = {
  element: Element
};

export class ScrollSnapSlider {
  /**
   * Base element of this slider
   */
  element: Element;

  /**
   * additional behaviour
   */
  plugins;

  /**
   * @inheritDoc
   */
  removeEventListener;

  /**
   * @inheritDoc
   */
  addEventListener;

  /**
   * Rounding method used to calculate the current slide (e.g. Math.floor, Math.round, Math.ceil, or totally custom.)
   *
   * @param value - factor indicating th current position (e.g "0" for first slide, "2.5" for third slide and a half)
   * @return f(x) - integer factor indicating the currently 'active' slide.
   */
  roundingMethod?: Function;

  /**
   * Timeout delay in milliseconds used to catch the end of scroll events
   */
  scrollTimeout?: number;

  /**
   * Calculated size of a single item
   */
  itemSize;

  /**
   * Computes a single number representing the slides widths.
   * By default, this will use the first slide's <code>offsetWidth</code>.
   * Possible values could be an average of all slides, the min or max values, ...
   *
   * @param slider current slider
   * @param entries resized entries
   * @return integer size of a slide in pixels
   */
  sizingMethod: Function;

  /**
   * Active slide
   */
  slide: number = 0;

  /**
   * Resize observer used to update item size
   */
  resizeObserver;

  /**
   * Timeout ID used to catch the end of scroll events
   */
  scrollTimeoutId: number | null;

  /**
   * Active slide's scrollLeft in the containing element
   */
  slideScrollLeft: number = 0;

  /**
   * Bind methods and possibly attach listeners.
   */
  constructor(options: ScrollSnapSliderOptions) {
    const { element, ...rest } = options;
    this.element = element;
    this.sizingMethod = (slider: ScrollSnapSlider) => {
      if (slider.element.firstElementChild) {
        return (slider.element.firstElementChild as HTMLElement).offsetWidth || 0;
      }
      return 0;
    };
    Object.assign(this, {
      scrollTimeout: 100,
      roundingMethod: Math.round,
      ...rest
    });
    this.scrollTimeoutId = null;
    this.itemSize = this.sizingMethod(this);
    this.update();
    this.addEventListener = this.element.addEventListener.bind(this.element);
    this.removeEventListener = this.element.removeEventListener.bind(
      this.element
    );
    this.plugins = new window.Map();
    this.resizeObserver = new ResizeObserver(this.onSlideResize);
    this.resizeObserver.observe(this.element);
    for (const child of Array.from(this.element.children)) {
      this.resizeObserver.observe(child);
    }
    this.attachListeners();
  }

  /**
   * Extend the Slider's functionality with Plugins
   *
   * @param plugins Plugins to attach
   * @param enabled Whether the plugins are enabled right away
   */
  with(plugins: any, enabled = true) {
    for (const plugin of plugins) {
      plugin.slider = this;
      this.plugins.set(plugin.id, plugin);
      enabled && plugin.enable();
    }
    return this;
  }

  /**
   * Attach all necessary listeners
   */
  attachListeners() {
    this.addEventListener('scroll', this.onScroll, { passive: true });
  }

  /**
   * Detach all listeners
   */
  detachListeners() {
    this.removeEventListener('scroll', this.onScroll);
    this.scrollTimeoutId && window.clearTimeout(this.scrollTimeoutId);
  }

  /**
   * Scroll to a slide by index.
   */
  slideTo = (index: number) => {
    this.element.scrollTo({
      left: index * this.itemSize
    });
  };

  /**
   * Free resources and listeners, disable plugins
   */
  destroy() {
    this.scrollTimeoutId && window.clearTimeout(this.scrollTimeoutId);
    this.detachListeners();
    for (const [id, plugin] of Array.from(this.plugins)) {
      plugin.disable();
      plugin.slider = null;
      this.plugins.delete(id);
    }
  }

  /**
   * Updates the computed values
   */
  update = () => {
    this.slide = this.calculateSlide();
    this.slideScrollLeft = this.slide * this.itemSize;
  };

  /**
   * Calculates the active slide using the user-defined <code>roundingMethod</code>
   */
  calculateSlide() {
    return this.roundingMethod ? this.roundingMethod(this.element.scrollLeft / this.itemSize) : 0;
  }

  /**
   * Calculate all necessary things and dispatch an event when sliding stops
   */
  onScrollEnd = () => {
    this.scrollTimeoutId = null;
    this.update();
    this.dispatch('slide-stop', this.slide);
  };

  /**
   * Callback on resize. This will recompute the <code>itemSize</code>
   * @param entries Entries that have changed size
   */
  onSlideResize = (entries: ResizeObserverEntry[]) => {
    this.itemSize = this.sizingMethod(this, entries);
  };

  /**
   * Dispatches an event on the slider's element
   */
  dispatch(event: string, detail: number) {
    return this.element.dispatchEvent(
      new window.CustomEvent<number>(event, {
        detail
      })
    );
  }

  /**
   * Act when scrolling starts and stops
   */
  onScroll = () => {
    if (this.scrollTimeoutId === null) {
      const direction = this.element.scrollLeft > this.slideScrollLeft ? 1 : -1;
      this.dispatch('slide-start', this.slide + direction);
    }
    if (this.calculateSlide() !== this.slide) {
      this.update();
      this.dispatch('slide-pass', this.slide);
    }
    this.scrollTimeoutId && window.clearTimeout(this.scrollTimeoutId);
    this.scrollTimeoutId = window.setTimeout(
      this.onScrollEnd,
      this.scrollTimeout
    );
  };
}

export const carouselScrollSnapSliderScript = `

class ScrollSnapSlider {
  /**
   * Base element of this slider
   */
  element;

  /**
   * additional behaviour
   */
  plugins;

  /**
   * @inheritDoc
   */
  removeEventListener;

  /**
   * @inheritDoc
   */
  addEventListener;

  /**
   * Rounding method used to calculate the current slide (e.g. Math.floor, Math.round, Math.ceil, or totally custom.)
   *
   * @param value - factor indicating th current position (e.g "0" for first slide, "2.5" for third slide and a half)
   * @return f(x) - integer factor indicating the currently 'active' slide.
   */
  roundingMethod;

  /**
   * Timeout delay in milliseconds used to catch the end of scroll events
   */
  scrollTimeout;

  /**
   * Calculated size of a single item
   */
  itemSize;

  /**
   * Computes a single number representing the slides widths.
   * By default, this will use the first slide's <code>offsetWidth</code>.
   * Possible values could be an average of all slides, the min or max values, ...
   *
   * @param slider current slider
   * @param entries resized entries
   * @return integer size of a slide in pixels
   */
  sizingMethod;

  /**
   * Active slide
   */
  slide;

  /**
   * Resize observer used to update item size
   */
  resizeObserver;

  /**
   * Timeout ID used to catch the end of scroll events
   */
  scrollTimeoutId;

  /**
   * Active slide's scrollLeft in the containing element
   */
  slideScrollLeft;

  /**
   * Bind methods and possibly attach listeners.
   */
  constructor(options) {
    Object.assign(this, {
      scrollTimeout: 100,
      roundingMethod: Math.round,
      sizingMethod: (slider) => slider.element.firstElementChild.offsetWidth,
      ...options
    });
    this.scrollTimeoutId = null;
    this.itemSize = this.sizingMethod(this);
    this.update();
    this.addEventListener = this.element.addEventListener.bind(this.element);
    this.removeEventListener = this.element.removeEventListener.bind(
      this.element
    );
    this.plugins = new window.Map();
    this.resizeObserver = new ResizeObserver(this.onSlideResize);
    this.resizeObserver.observe(this.element);
    for (const child of this.element.children) {
      this.resizeObserver.observe(child);
    }
    this.attachListeners();
  }

  /**
   * Extend the Slider's functionality with Plugins
   *
   * @param plugins Plugins to attach
   * @param enabled Whether the plugins are enabled right away
   */
  with(plugins, enabled = true) {
    for (const plugin of plugins) {
      plugin.slider = this;
      this.plugins.set(plugin.id, plugin);
      enabled && plugin.enable();
    }
    return this;
  }

  /**
   * Attach all necessary listeners
   */
  attachListeners() {
    this.addEventListener('scroll', this.onScroll, { passive: true });
  }

  /**
   * Detach all listeners
   */
  detachListeners() {
    this.removeEventListener('scroll', this.onScroll);
    this.scrollTimeoutId && window.clearTimeout(this.scrollTimeoutId);
  }

  /**
   * Scroll to a slide by index.
   */
  slideTo = (index) => {
    this.element.scrollTo({
      left: index * this.itemSize
    });
  };

  /**
   * Free resources and listeners, disable plugins
   */
  destroy() {
    this.scrollTimeoutId && window.clearTimeout(this.scrollTimeoutId);
    this.detachListeners();
    for (const [id, plugin] of this.plugins) {
      plugin.disable();
      plugin.slider = null;
      this.plugins.delete(id);
    }
  }

  /**
   * Updates the computed values
   */
  update = () => {
    this.slide = this.calculateSlide();
    this.slideScrollLeft = this.slide * this.itemSize;
  };

  /**
   * Calculates the active slide using the user-defined <code>roundingMethod</code>
   */
  calculateSlide() {
    return this.roundingMethod(this.element.scrollLeft / this.itemSize);
  }

  /**
   * Calculate all necessary things and dispatch an event when sliding stops
   */
  onScrollEnd = () => {
    this.scrollTimeoutId = null;
    this.update();
    this.dispatch('slide-stop', this.slide);
  };

  /**
   * Callback on resize. This will recompute the <code>itemSize</code>
   * @param entries Entries that have changed size
   */
  onSlideResize = (entries) => {
    this.itemSize = this.sizingMethod(this, entries);
  };

  /**
   * Dispatches an event on the slider's element
   */
  dispatch(event, detail) {
    return this.element.dispatchEvent(
      new window.CustomEvent(event, {
        detail
      })
    );
  }

  /**
   * Act when scrolling starts and stops
   */
  onScroll = () => {
    if (this.scrollTimeoutId === null) {
      const direction = this.element.scrollLeft > this.slideScrollLeft ? 1 : -1;
      this.dispatch('slide-start', this.slide + direction);
    }
    if (this.calculateSlide() !== this.slide) {
      this.update();
      this.dispatch('slide-pass', this.slide);
    }
    this.scrollTimeoutId && window.clearTimeout(this.scrollTimeoutId);
    this.scrollTimeoutId = window.setTimeout(
      this.onScrollEnd,
      this.scrollTimeout
    );
  };
}
`;
