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
import { HOC } from '@bodiless/fclasses';
import { useStructuredData } from '../../StructureDataProvider';
import { DataStructureSchemaProps } from '../../types';
import { getSchemaSourceData } from '../../util';

export const ProductSchemaPropsList: Array<DataStructureSchemaProps> = [
  { name: 'product-name', type: 'text', unique: true },
  { name: 'product-image', type: 'img' },
  { name: 'product-description', type: 'text', unique: true },
  { name: 'product-sku', type: 'text', unique: true },
  { name: 'product-mpn', type: 'text', unique: true },
  { name: 'product-brand-name', type: 'text', unique: true },
  { name: 'product-review-rating-ratingValue', type: 'text', unique: true },
  { name: 'product-review-rating-bestRating', type: 'text', unique: true },
  { name: 'product-review-author-name', type: 'text', unique: true },
  { name: 'product-aggregateRating-ratingValue', type: 'text', unique: true },
  { name: 'product-aggregateRating-reviewCount', type: 'text', unique: true },
  { name: 'product-offer-price', type: 'text', unique: true },
  { name: 'product-offer-availability', type: 'text', unique: true },
  { name: 'product-offer-itemOffered', type: 'text', unique: true },
  { name: 'product-offer-priceCurrency', type: 'text', unique: true },
  { name: 'product-offer-priceValidUntil', type: 'text', unique: true },
  { name: 'product-offer-url', type: 'text', unique: true },
];

export const withProductSchema = (
  schemaSourceKeys: Array<DataStructureSchemaProps>,
) => (Component: ComponentType) => {
  const withSD = (props: object) => {
    const { setStructuredData } = useStructuredData();
    useEffect(() => {
      const {
        'product-name': name,
        'product-image': image,
        'product-description': description,
        'product-sku': sku,
        'product-mpn': mpn,
        'product-brand-name': brandName,
        'product-review-rating-ratingValue': reviewRatingValue,
        'product-review-rating-bestRating': reviewBestRating,
        'product-review-author-name': reviewAuthorName,
        'product-aggregateRating-ratingValue': aggregateRatingValue,
        'product-aggregateRating-reviewCount': aggregateReviewCount,
        'product-offer-price': offerPrice,
        'product-offer-availability': offerAvailability,
        'product-offer-itemOffered': offerItemOffered,
        'product-offer-priceCurrency': offerPriceCurrency,
        'product-offer-priceValidUntil': offerPriceValidUntil,
        'product-offer-url': offerUrl,
      } = getSchemaSourceData(schemaSourceKeys);

      // For review, both rating value and author must be provided.
      const hasReview = reviewRatingValue && reviewAuthorName;

      // For aggregating rating, both value and review count must be provided.
      const hasAggregateRating = aggregateRatingValue && aggregateReviewCount;

      // Name is mandatory, as well as review or aggregate rating or offer (price)
      // to generate product schema.
      if (!name && !(hasReview || hasAggregateRating)) return;

      const imagesFullPath = image.map((img: string) => (img
        ? window.location.origin + img
        : img));

      const ProductSchema = {
        name,
        ...(image.length > 0 && { image: imagesFullPath }),
        ...(description && { description }),
        ...(sku && { sku }),
        ...(mpn && { mpn }),
        ...(brandName && {
          brand: {
            '@type': 'Brand',
            name: brandName,
          },
        }),
        ...(hasReview && {
          review: {
            '@type': 'Review',
            reviewRating: {
              '@type': 'Rating',
              ...(reviewRatingValue && { ratingValue: reviewRatingValue }),
              ...(reviewBestRating && { bestRating: reviewBestRating }),
            },
            author: {
              '@type': 'Person',
              ...(reviewAuthorName && { name: reviewAuthorName }),
            },
          },
        }),
        ...(hasAggregateRating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ...(aggregateRatingValue && { ratingValue: aggregateRatingValue }),
            ...(aggregateReviewCount && { reviewCount: aggregateReviewCount }),
          },
        }),
        ...({
          offers: {
            '@type': 'Offer',
            price: offerPrice || '0',
            ...(offerAvailability && { availability: offerAvailability }),
            ...(offerItemOffered && { itemCondition: offerItemOffered }),
            ...(offerPriceCurrency && { priceCurrency: offerPriceCurrency }),
            ...(offerPriceValidUntil && { priceValidUntil: offerPriceValidUntil }),
            ...(offerUrl && { url: offerUrl }),
          },
        }),
      };

      setStructuredData('Product', ProductSchema);
    }, []);

    return (
      <Component {...props} />
    );
  };

  return withSD;
};

export const WithProductSchema = withProductSchema(ProductSchemaPropsList) as HOC;
