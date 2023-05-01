/**
 * Copyright © 2023 Johnson & Johnson
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

import React, { ComponentType as CT } from 'react';
import omit from 'lodash/omit';
import NextPluginImage, {
  ImageProps as NextPluginImageProps, StaticImageData
} from 'next/image';
import {
  ifEditable,
  withActivatorWrapper,
} from '@bodiless/core';
import {
  addClasses,
  DesignableComponentsProps,
  withDesign,
  withoutProps,
  designable,
  HOC,
  flowHoc,
  DesignableComponents,
} from '@bodiless/fclasses';
import type { ImageData } from '@bodiless/components';

import NextImagePresets from './NextImagePresets';

/**
 * Bodiless Image Components to function as either Next image or plain image
 *
 * @category Component
 */
export interface BodilessImageComponents extends DesignableComponents {
  /**
   * Next Image
   */
  NextImage: CT<NextPluginImageProps>,
  /**
   * Plain Image
   */
  Image: CT<any>,
}

export type NextImageData = ImageData & {
  preset: NextImagePresets;
  base64: string;
  imgStyle?: React.CSSProperties
};

export type NextImageProps = NextPluginImageProps
& NextImageData & DesignableComponentsProps<BodilessImageComponents>;

export type BodilessNextImageProps = NextPluginImageProps
& DesignableComponentsProps<BodilessImageComponents>;

const asDesignableNextImage = (ImageComponent: CT<any>) => {
  const startComponents: BodilessImageComponents = {
    NextImage: NextPluginImage,
    Image: ImageComponent,
  };

  const AsDesignableNextImage = (props: NextImageProps) => {
    const {
      components,
      alt = '',
      preset,
      src,
      base64 = '',
      width = 0,
      height = 0,
      imgStyle= {},
      loading='lazy',
      ...rest
    } = props;

    const {
      NextImage,
      Image
    } = components;

    const { objectFit = 'fill', ...restImgStyle} = imgStyle;

    const priority = loading === 'eager';

    // On edit environemnt Next Image raise an unclear error, use image.
    if (process.env.NODE_ENV === 'development') {
      return (
        <Image
          src={(src as StaticImageData).src || src}
          alt={alt}
          style={imgStyle}
          loading={loading}
          {
            ...omit(rest, 'canonicalPreset', '_nodeKey')
          }
        />
      );
    }

    if (!preset) {
      if (typeof src === 'object') {
        return (
          <NextImage
            src={src}
            alt={alt}
            style={restImgStyle || {}}
            priority={priority}
            loading={loading}
            objectFit={objectFit}
            {
              ...omit(rest, 'canonicalPreset', '_nodeKey')
            }
          />
        );
      }

      return (
        <Image
          src={src}
          alt={alt}
          style={imgStyle}
          loading={loading}
          {
            ...omit(rest, 'canonicalPreset', '_nodeKey')
          }
        />
      );
    }

    type PresetProps = {
      layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive',
      useBlur: boolean
    };

    const presetProps: PresetProps = {
      layout: 'fill',
      useBlur: false,
    };

    switch (preset) {
      case NextImagePresets.Fixed:
      case NextImagePresets.FixedTracedSVG:
      case NextImagePresets.FixedWithWebp:
      case NextImagePresets.FixedWithWebpTracedSVG:
        presetProps.layout = 'fixed';
        presetProps.useBlur = true;
        break;
      case NextImagePresets.FixedNoBase64:
      case NextImagePresets.FixedWithWebpNoBase64:
        presetProps.layout = 'fixed';
        presetProps.useBlur = false;
        break;
      case NextImagePresets.Fluid:
      case NextImagePresets.FluidLimitPresentationSize:
      case NextImagePresets.FluidTracedSVG:
      case NextImagePresets.FluidWithWebp:
      case NextImagePresets.FluidWithWebpTracedSVG:
        presetProps.layout = 'responsive';
        presetProps.useBlur = true;
        break;
      case NextImagePresets.FluidNoBase64:
      case NextImagePresets.FluidWithWebpNoBase64:
        presetProps.layout = 'responsive';
        presetProps.useBlur = true;
        break;
      default:
        break;
    }

    const widthHeightAvailable = !!(width && height);

    const layout = widthHeightAvailable ? presetProps.layout : 'fill';

    const imageProps = {
      alt,
      src,
    } as NextPluginImageProps;

    if (width) {
      imageProps.width = width as number;
    }
    if (height) {
      imageProps.height = height as number;
    }

    // if (process.env.NODE_ENV !== 'development') {
    imageProps.placeholder= presetProps.useBlur ? 'blur' : 'empty';
    imageProps.blurDataURL= presetProps.useBlur ? base64 : undefined;
    // }

    return (
      <NextImage
        layout={layout}
        {...imageProps}
        style={imgStyle}
        priority={priority}
        objectFit={objectFit}
        loading={loading}
        {...omit(rest, 'canonicalPreset', '_nodeKey')}
      />
    );
  };
  return designable(startComponents, 'NextImage')(AsDesignableNextImage);
};

const withActivatorWrapperDefaultStyles = addClasses('bl-w-full');

/**
 * `asNextImage` is a HOC that either replaces the component with NextImg, if the data required
 * for NextImg is available, or it renders the input component, otherwise.
 */
const asNextImage = flowHoc(
  // @todo this cast should not be necessary.
  asDesignableNextImage as HOC,
  withDesign({
    NextImage: ifEditable(
      withActivatorWrapper(
        'onClick',
        withActivatorWrapperDefaultStyles(NextPluginImage),
      ),
    ),
  }),
);

/**
 * hoc to remove props configured for NextImage in image data
 *
 * it can be useful for cases when Next Image is not enabled for the image
 */
export const withoutNextImageProps = withoutProps([
  'preset',
]);

export default asNextImage;
