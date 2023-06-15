import dynamic from 'next/dynamic';
import { notFound, redirect } from 'next/navigation';
import { getPageData } from '@bodiless/next/lib/app/getPageData';

export { generateStaticParams } from '@bodiless/next/lib/app/generateStaticParams';

const Styleguide = dynamic(() => import('../../../templates/styleguide'));
const Default = dynamic(() => import('../../../templates/_default'));

const Templates = {
  '_default.jsx': Default,
  'styleguide.jsx': Styleguide,
};

type Props = {
  params: { slug?: string[] };
};

const Page = async ({ params }: Props) => {
  const { data, redirectTo } = await getPageData(params);

  if (redirectTo) redirect(redirectTo[0].toPath);
  if (!data) notFound();

  const DefaultPage = Templates[data.component] || Default;
  return <DefaultPage {...data} />;
};

export default Page;
