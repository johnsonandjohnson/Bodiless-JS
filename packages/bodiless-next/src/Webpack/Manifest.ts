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
import { join, posix, resolve } from 'path';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import sharp from 'sharp';
import bodilessNextConfigPath, { ManifestConfig } from '../NextConfig/bodilessNextConfigLoader';

async function generateIcon(imgPath: string, srcIcon: string, size: number) {
  return sharp(srcIcon)
    .resize({
      width: size,
      height: size,
      fit: 'contain',
      background: {
        r: 255,
        g: 255,
        b: 255,
        alpha: 0
      },
    })
    .toFile(imgPath);
}

const generateManifest = (options: ManifestConfig | undefined) => {
  const publicPath = './public';
  const manigestFileName = 'manifest.webmanifest';

  const config = {
    ...bodilessNextConfigPath.manifest || {},
    ...options
  };

  const {
    legacy,
    theme_color_in_head,
    crossOrigin,
    include_favicon,
    icon = false,
    icon_sizes,
    ...manifest
  } = config;
  if (!manifest.icons && icon && typeof icon === 'string' && existsSync(icon)) {
    const destinationDir = join('public', 'icons');
    if (!existsSync(destinationDir)) {
      try {
        mkdirSync(destinationDir);
      } catch (error) {
        //
      }
    }

    manifest.icons = icon_sizes.map(size => {
      const imgPath = join(destinationDir, `icon-${size}x${size}.png`);
      generateIcon(imgPath, icon, size);
      return {
        src: posix.join('icons', `icon-${size}x${size}.png`),
        sizes: `${size}x${size}`,
        type: 'image/png',
      };
    });

    // Generate favicon.
    generateIcon(join(destinationDir, 'favicon-32x32.png'), icon, 32);
  } else if (!manifest.icons && icon && typeof icon !== 'string') {
    manifest.icons = [icon];
  }

  const filename = join(publicPath, manigestFileName);
  return writeFileSync(resolve(filename), JSON.stringify(manifest, null, 2));
};

export default generateManifest;
