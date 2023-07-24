/* eslint-disable prefer-template */
import { flowIf } from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import { TextNode, toSlateParagraphNode } from '../PDPSlateHelpers';
import { usePDPContext } from '../PDPTemplateContext';

const toSnakeCase = (str: string) => str[0].toLowerCase() + str.slice(1, str.length)
  .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

const useHasNoProductData = (component: string) => () => {
  const product = usePDPContext();
  const componentName = toSnakeCase(component) as keyof typeof product;

  if (!product) return true;
  if (!(componentName in product)) return true;
  if (!Array.isArray(product[componentName])) return true;
  if ((product[componentName] as []).filter(Boolean).length <= 0) return true;

  return false;
};

export const useProductTitleContent = () => ({
  title: { text: usePDPContext()?.name },
});

export const useProductDescriptionContent = () => ({
  description: [toSlateParagraphNode(usePDPContext()?.summary)],
});

export const useProductImageContent = () => {
  const product = usePDPContext();
  if (!product?.images) return {};
  return {
    image: {
      src: `https:${product?.images[0]?.file.url}`,
      alt: product?.images[0]?.description,
      title: product?.images[0]?.title,
    }
  };
};

export const useAccordionContent = () => {
  const product = usePDPContext();

  const ingredients = toSlateParagraphNode(
    product?.ingredients?.filter(Boolean).map(
      i => new TextNode(`${i.title} ${i.inactive_active
        ? '-' + i.inactive_active
        : ''
      } \n`)
    )
  );
  const directions = product?.directions?.map(direction => toSlateParagraphNode(direction));
  const warnings = product?.warnings?.map(warning => toSlateParagraphNode(warning));
  const additionalInfo = product?.additional_info?.map(info => toSlateParagraphNode(info));

  return {
    'section-content$Ingredients$accordion$title': { text: 'Ingredients' },
    'section-content$Ingredients$accordion$body': [ingredients],
    'section-content$Directions$accordion$title': { text: 'Directions' },
    'section-content$Directions$accordion$body': directions,
    'section-content$Warnings$accordion$title': { text: 'Warnings' },
    'section-content$Warnings$accordion$body': warnings,
    'section-content$AdditionalInfo$accordion$title': { text: 'Additional Information' },
    'section-content$AdditionalInfo$accordion$body': additionalInfo,
  };
};

export const useFAQContent = () => ({ faqs: usePDPContext()?.faq });

export const useHasFAQData = (): boolean => {
  const product = usePDPContext();
  return Boolean(product?.faq && product?.faq.length > 0);
};

export const useHasDescription = () => {
  const product = usePDPContext();
  return Boolean(product?.summary && product?.summary.length > 0);
};

export const useHasMoreToKnowData = (
  components: string[],
) => () => components.map(useHasNoProductData).some(fn => !fn());

export const withHiddenIfNoData = (component: string) => asFluidToken({
  Flow: flowIf(useHasNoProductData(component)),
  Core: {
    [component]: 'hidden',
  },
});
