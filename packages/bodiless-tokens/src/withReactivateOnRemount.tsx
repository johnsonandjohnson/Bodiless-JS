import React, { FC, ComponentType } from 'react';
import { useEditContext, useActivateOnEffect, useActivateOnEffectActivator } from '@bodiless/core';
import { v4 } from 'uuid';

export const useReactivateOnRemount = (uuid: string) => {
  const context = useEditContext();
  const { setId } = useActivateOnEffect();
  if (context.isInnermost) setId(uuid);
  useActivateOnEffectActivator(uuid);
};
const withReactivateOnRemount = (
  uuid: string = v4(),
) => <P extends object>(Component: ComponentType<P>) => {
  const WithReactivateOnRemount: FC<P> = props => {
    useReactivateOnRemount(uuid);
    return <Component {...props} />;
  };
  return WithReactivateOnRemount;
};

export default withReactivateOnRemount;
