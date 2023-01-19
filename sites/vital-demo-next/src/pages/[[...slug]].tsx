import React from 'react';
import getPages from '@bodiless/components/lib/NodeApi/getPages';
import getDisabledPages from '@bodiless/components/lib/NodeApi/getDisabledPages';
import { getStaticProps } from '@bodiless/next/lib/getStaticProps';
import _default from '../templates/_default';
import styleguide from '../templates/styleguide';

const Templates = {
  '_default.jsx': _default,
  'styleguide.jsx': styleguide
};

export {
  getStaticProps
};

export async function getStaticPaths() {
  const pages = await getPages();

  const disablePageList = getDisabledPages();
  const disabledPages = Object.keys(disablePageList).filter(
    item => disablePageList[item].pageDisabled === true,
  ) || [];

  const activePages = pages.filter(
    page => (!(process.env.NODE_ENV === 'production' && disabledPages.indexOf(`${page}/`.replace('//', '/')) > -1))
  );

  return {
    paths: activePages.map(page => ({
      params: {
        slug: page.split('/').filter(Boolean) || []
      }
    })),
    fallback: false,
  };
}

const Page = ({ component, ...rest }: any) => {
  const DefaultPage = Templates[component] || _default;
  return <DefaultPage {...rest} />;
};

export default Page;
