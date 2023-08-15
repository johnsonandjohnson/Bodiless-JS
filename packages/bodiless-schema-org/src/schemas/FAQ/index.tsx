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
import { getSchemaSourceData } from '../../util';
import { DataStructureSchemaProps } from '../../types';

const getArrayValueText = (elementRaw: any) => {
  let element = elementRaw;

  if (typeof element !== 'string') {
    element = (element && element.firstChild) ? element.firstChild.innerText : '';
  }

  return String(element);
};

const mergeAccordionsData = (questions: any, answers: any) => {
  // Accordion item as a question-answer pair.
  const accordions: Array<{ question: string, answer: string }> = [];

  Object.keys(questions).forEach(index => {
    // For the retrieved accordion fields,
    // they can return as flow containers nodes as simple text, so we need
    // to extract the saved data in text format.
    const question = getArrayValueText(questions[index]);
    const answer = getArrayValueText(answers[index]);

    // We don't want to include accordions containing either question/answer as empty
    // since that invalidates schema markup.
    // @see https://developers.google.com/search/docs/advanced/structured-data/faqpage.
    if (question !== '' && answer !== '') {
      accordions.push({
        question,
        answer,
      });
    }
  });

  return accordions;
};

export const FAQSchemaPropsList: Array<DataStructureSchemaProps> = [
  { name: 'faq-question', type: 'node' },
  { name: 'faq-answer', type: 'node' },
];

export const withFAQPageSchema = (
  schemaSourceKeys: Array<DataStructureSchemaProps>,
) => (Component: ComponentType) => {
  const withSD = (props: object) => {
    const { setStructuredData } = useStructuredData();

    useEffect(() => {
      const {
        'faq-question': accordionQuestions,
        'faq-answer': accordionAnswers,
      } = getSchemaSourceData(schemaSourceKeys);

      // Since accordion schema fields are retrieved apart,
      // creates new accordion array with merged valid data.
      const accordions = mergeAccordionsData(
        accordionQuestions,
        accordionAnswers,
      );

      // If there are no valid accordions, don't do anything else.
      // @ts-ignore length does exist on type never.
      if (!accordions.length > 0) return;

      const FAQSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@name': 'Questions and answers',
        mainEntity: [] as Record<string, object | string>[],
      };

      Object.values(accordions).forEach(
        accordion => FAQSchema.mainEntity.push({
          '@type': 'Question',
          name: accordion.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: accordion.answer,
          },
        }),
      );

      setStructuredData('FAQPage', () => FAQSchema);
    }, []);
    return (
      <Component {...props} />
    );
  };

  return withSD;
};

export const withFAQSchema = withFAQPageSchema(FAQSchemaPropsList) as HOC;
