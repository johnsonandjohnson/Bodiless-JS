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

import React, {
  ComponentType, useEffect,
} from 'react';
import { useNode } from '@bodiless/data';
import { HOC } from '@bodiless/fclasses';
import { useStructuredData } from '../../StructureDataProvider';
import { useIsHomePage } from '../../util';
import { PageTypeNodeData } from '../../types';

export const withOrganizationSchema = () => (
  Component: ComponentType,
) => {
  const withSD = (props: object) => {
    const { setStructuredData } = useStructuredData();
    const { node } = useNode();

    const withNodeData = (field: string) => {
      const pageTypeNode = node.peer<PageTypeNodeData>(['Page', 'meta', field]);
      const { content } = pageTypeNode.data;
      return content;
    };

    const name = withNodeData('page-title');
    const url = (typeof window !== 'undefined') ? window.location.origin + window.location.pathname : '';
    const urlImage = (typeof window !== 'undefined') ? window.location.origin : '';

    const telephone = withNodeData('organization-telephone');
    const contactType = withNodeData('organization-contact-type');
    const contactOption = withNodeData('organization-contact-option');
    const areaServed = withNodeData('organization-area-served');

    const hasContactPoint = !!((
      contactType || telephone || contactOption || areaServed
    ));

    const isHomePage = useIsHomePage();

    useEffect(() => {
      // Generate schema only on home page.
      if (!isHomePage || !url) return;

      let logo = document.querySelector('[data-schema-source=organization-logo]');

      if (logo) {
        const organizationSchema = {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name,
          url,
          logo: urlImage + logo?.getAttribute('src') || logo?.getAttribute('data-src'),
          ...(hasContactPoint && {
            contactPoint: {
              '@type': 'ContactPoint',
              contactType,
              telephone,
              contactOption,
              areaServed,
            },
          }),
        };

        setStructuredData('Organization', organizationSchema);
      }

      // To get the value image of element hydrated
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'src') {
            logo = document.querySelector('[data-schema-source=organization-logo]');
          }
          // Logo and URL is mandatory to generate organization schema.
          if (!logo) return;

          observer.disconnect();

          const organizationSchema = {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name,
            url,
            logo: urlImage + logo?.getAttribute('src') || logo?.getAttribute('data-src'),
            ...(hasContactPoint && {
              contactPoint: {
                '@type': 'ContactPoint',
                contactType,
                telephone,
                contactOption,
                areaServed,
              },
            }),
          };

          setStructuredData('Organization', organizationSchema);
        });
      });

      const logoWrapper = document.querySelector('[data-layer-region="Logo:Link"]');

      const config = {
        childList: true,
        attributes: true,
        subtree: true,
      };

      if (logoWrapper) {
        observer.observe(logoWrapper, config);
      }
    }, []);

    return (
      <Component {...props} />
    );
  };

  return withSD;
};
export const WithOrganizationSchema = withOrganizationSchema() as HOC;
