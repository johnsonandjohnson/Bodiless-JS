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
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import bodilessNextConfigPath, { ManifestConfig } from './NextConfig/bodilessNextConfigLoader';

/**
 * Add Meta tags related to manifest.
 */
const ManifestMeta: FC = () => {
  const { manifest = {} as ManifestConfig} = bodilessNextConfigPath;
  const {
    icon,
    icon_sizes,
    legacy = true,
    include_favicon = true,
    theme_color_in_head = true,
    theme_color = '',
    crossOrigin = 'anonymous'
  } = manifest;

  if (!manifest.icons && icon && typeof icon === 'string') {
    manifest.icons = icon_sizes.map(size => ({
      src: ['icons', `icon-${size}x${size}.png`].join('/'),
      sizes: `${size}x${size}`,
      type: 'image/png',
    }));
  }

  const favicons = include_favicon ? (
    <link
      key="manifest-icon-link-png"
      rel="icon"
      href="icons/favicon-32x32.png"
      type="image/png"
    />
  ) : <></>;
  const themeColorMeta = theme_color_in_head ? (
    <meta
      key="manifest-theme-color"
      name="theme-color"
      content={theme_color}
    />
  ): <></>;

  const legacyIcons = legacy ? ((manifest.icons || []).map(icon => (
    <link
      key={`manifest-apple-touch-icon-${icon.sizes}`}
      rel="apple-touch-icon"
      sizes={icon.sizes}
      href={icon.src}
    />
  ))) : <></>;

  return (
    <Helmet>
      <link
        key="manifest-link"
        rel="manifest"
        href="/manifest.webmanifest"
        crossOrigin={crossOrigin}
      />
      {favicons}
      {themeColorMeta}
      {legacyIcons}
    </Helmet>
  );
};
export default ManifestMeta;
