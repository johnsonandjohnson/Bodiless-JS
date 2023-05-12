import getStaticProps from '@bodiless/next/lib/getStaticProps';
import getStaticPaths from '@bodiless/next/lib/getStaticPaths';
import PageRenderer from '@bodiless/next/lib/PageRenderer';
import _default from '../templates/_default';

const Templates = {
  '_default.jsx': _default,
};

export {
  getStaticProps,
  getStaticPaths
};

const Page = ({ component, ...rest }: any) => {
  const DefaultPage = Templates[component] || _default;
  return PageRenderer({
    Component: DefaultPage,
    ...rest
  });
};

export default Page;
