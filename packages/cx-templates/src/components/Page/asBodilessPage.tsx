import React from 'react';
import type { FC, ComponentProps } from 'react';
import type { Enhancer, DesignableProps } from '@bodiless/fclasses';
import { Page as BodilessPage } from '@bodiless/gatsby-theme-bodiless';

export type PageProps = DesignableProps & ComponentProps<typeof BodilessPage>;

export const asBodilessPage: Enhancer<PageProps, DesignableProps<any>> = Component => {
  const AsBodilessPage: FC<any> = (props: PageProps) => {
    const { design, ...rest } = props;
    const designProp: any = { design };
    return (
      <BodilessPage {...rest}>
        <Component {...designProp} />
      </BodilessPage>
    );
  };
  return AsBodilessPage;
};
