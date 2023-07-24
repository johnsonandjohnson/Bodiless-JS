/* eslint-disable react/no-array-index-key */
import React, { FC, useMemo } from 'react';
import { withDefaultContent, withNode, withNodeKey } from '@bodiless/data';
import { AccordionClean } from '@bodiless/vital-accordion';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import {
  designable, flowHoc, DesignableComponentsProps,
  ComponentOrTag, Fragment,
} from '@bodiless/fclasses';

import { toSlateParagraphNode, TextNode } from '../PDPTemplate/PDPSlateHelpers';
import type { ContentfulFAQ } from '../PDPTemplate/types';

export type FAQListComponents = {
  Wrapper: ComponentOrTag<any>,
  FAQComponent: ComponentOrTag<any>,
};

export const faqListComponents: FAQListComponents = {
  Wrapper: Fragment,
  FAQComponent: AccordionClean,
};

export type FAQListBaseProps = DesignableComponentsProps<FAQListComponents>
& { faqs?: ContentfulFAQ[] };

const useAccordionContent = (faq: ContentfulFAQ) => ({
  accordion$title: { text: faq?.question },
  accordion$body: faq?.answer?.content.map((node: any) => toSlateParagraphNode(node.content))
    || [toSlateParagraphNode([new TextNode(' ')])],
});

const FAQListBase: FC<FAQListBaseProps> = props => {
  const { components, faqs = [] } = props;
  const { Wrapper, FAQComponent } = components;

  const items = useMemo(() => faqs.map((faq, index) => {
    const Component = flowHoc(
      withDefaultContent(useAccordionContent(faq)),
      withNode,
      withNodeKey(`question-${index}`),
    )(FAQComponent);

    return (<Component key={`question-${index}`} />);
  }), [faqs]);

  return (
    <Wrapper>
      {items}
    </Wrapper>
  );
};

const FAQListClean = designable(
  faqListComponents, 'FAQList'
)(FAQListBase);

export const asFAQListToken = asVitalTokenSpec<FAQListComponents>();
export default FAQListClean;
