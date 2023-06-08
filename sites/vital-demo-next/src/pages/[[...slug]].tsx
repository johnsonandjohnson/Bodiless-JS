import React from 'react';
import { getStaticHtml } from '@bodiless/next/lib/getStaticProps';
import getStaticPaths from '@bodiless/next/lib/getStaticPaths';
import PageRenderer from '@bodiless/next/lib/PageRenderer';
import _default from '../templates/_default';
import styleguide from '../templates/styleguide';

const Templates = {
  '_default.jsx': _default,
  'styleguide.jsx': styleguide,
};

const Page = ({ component, ...rest }: any) => {
  const DefaultPage = Templates[component] || _default;
  return PageRenderer({
    Component: DefaultPage,
    ...rest,
  });
};

const Html = ({ html }: any) => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
);

export const getStaticProps = getStaticHtml(Page);

export { getStaticPaths };

export default Html;
