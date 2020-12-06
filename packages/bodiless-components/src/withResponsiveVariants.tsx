import React, { ComponentType, useState, useEffect } from 'react';
import {
  Design, DesignableComponents, DesignableComponentsProps, designable,
} from '@bodiless/fclasses';
import { flow } from 'lodash';
import { withPageDimensionsContext, PageDimensionsProviderProps, usePageDimensionsContext } from './PageDimensionsProvider';

type FinalComponents<P> = {
  SSRComponent: ComponentType<P>,
  ProperComponent: ComponentType<P>,
};

/**
 * Generates an HOC which makes the underlying component designable at diferent
 * breakpoints. This allows responsive rendering or swapping a component entirely
 * depending on viewport size.
 *
 * In general, you should not use this to provide different styling at different
 * viewports: do that with media queries. Instead, use this if you want to produce
 * different *markup* at different viewports.
 *
 * Note that all variants will be rendered during SSR, and then replaced in the
 * browser with the one appropriate to the current viewport.  To avoid flicker when a
 * server renderd page is displayed in the browser, you should be sure to hide
 * variants which are not active using CSS.
 *
 * @param options
 * Options defining the variants, including a list of breakpoints.
 *
 * @return
 * HOC which produces a component designable at each breakpoint.
 */
const withResponsiveVariants = (
  options: Required<PageDimensionsProviderProps>,
) => <P extends object>(
  Component: ComponentType<P>,
) => {
  const applyDesign = (design: Design<DesignableComponents>) => {
    const components: DesignableComponents = Object.keys(design).reduce((comps, key) => ({
      ...comps,
      [key]: design[key]!(Component),
    }), { _default: Component });

    // During SSR we render all the variants
    const SSRComponent = (props: P) => {
      const variants = Object.keys(components).map(key => {
        const Variant = components[key];
        return <Variant key={key} {...props} />;
      });
      return <>{variants}</>;
    };

    // In the browser (on effect) we replace with a component which renders
    // the proper variant for the viewport.
    const ProperComponent = (props: P) => {
      const { size } = usePageDimensionsContext();
      // eslint-disable-next-line no-underscore-dangle
      const FinalComponent = components[size] || components._default;
      return <FinalComponent {...props} />;
    };
    return { SSRComponent, ProperComponent };
  };

  const ResponsiveVariants = (props: P & DesignableComponentsProps<FinalComponents<P>>) => {
    const { components, ...rest } = props;
    const { SSRComponent, ProperComponent } = components;
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => setIsBrowser(true), []);
    return isBrowser ? <ProperComponent {...rest as P} /> : <SSRComponent {...rest as P} />;
  };

  return flow(
    designable<any>(applyDesign),
    withPageDimensionsContext(options),
  )(ResponsiveVariants);
};

export default withResponsiveVariants;
