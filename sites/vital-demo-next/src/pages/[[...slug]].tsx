import getStaticProps from '@bodiless/next/lib/getStaticProps';
import getStaticPaths from '@bodiless/next/lib/getStaticPaths';
import PageRenderer from '@bodiless/next/lib/PageRenderer';
import dynamic from 'next/dynamic';

const Styleguide = dynamic(() => import('../templates/styleguide'));
const Default = dynamic(() => import('../templates/_default'));

const Templates = {
  '_default.jsx': Default,
  'styleguide.jsx': Styleguide
};

export {
  getStaticProps,
  getStaticPaths
};

const Page = ({ component, ...rest }: any) => {
  const DefaultPage = Templates[component] || Default;
  return PageRenderer({
    Component: DefaultPage,
    ...rest
  });
};

export default Page;
