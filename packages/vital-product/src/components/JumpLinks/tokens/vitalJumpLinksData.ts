import { useListContext } from '@bodiless/components';

export const useIsFirstItem = () => {
  const { currentItem, items } = useListContext();

  return currentItem === items?.[0];
};

export const useJumpLinksContent = () => ({
  'jump-links': {
    items: [
      'default',
      '493a7370-c064-44e2-a6cf-8cb08f5173c0',
      '493a7370-c064-44e2-a6cf-8cb08f5173c1',
      '3e2575e3-51da-4bca-b148-5332a33d24e9',
      'c8fa9040-fd32-4267-8d1b-e2c6fac5cb5d',
      'c8fa9040-fd32-4267-8d1b-e2c6fac5cb5e',
      'c8fa9040-fd32-4267-8d1b-e2c6fac5cb5f',
      'c8fa9040-fd32-4267-8d1b-e2c6fac5cb5c'
    ]
  },
  'jump-links$default$title': {
    text: 'Jump To',
  },
  'jump-links$493a7370-c064-44e2-a6cf-8cb08f5173c0$title': {
    text: 'Details',
  },
  'jump-links$493a7370-c064-44e2-a6cf-8cb08f5173c1$title': {
    text: 'Ingredients',
  },
  'jump-links$3e2575e3-51da-4bca-b148-5332a33d24e9$title': {
    text: 'Directions',
  },
  'jump-links$c8fa9040-fd32-4267-8d1b-e2c6fac5cb5d$title': {
    text: 'Warnings',
  },
  'jump-links$c8fa9040-fd32-4267-8d1b-e2c6fac5cb5e$title': {
    text: 'Additional Info',
  },
  'jump-links$c8fa9040-fd32-4267-8d1b-e2c6fac5cb5f$title': {
    text: 'From The Collection',
  },
  'jump-links$c8fa9040-fd32-4267-8d1b-e2c6fac5cb5c$title': {
    text: 'FAQ',
  },
});
