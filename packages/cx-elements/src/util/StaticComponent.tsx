import React, { FC } from 'react';
import { HOC } from "@bodiless/fclasses";

const staticToken: HOC = Component => props => {
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    console.warn('You are rendering a static component in the browser.  Wrap it in withoutHydration');
  }
  return <Component {...props} />;
}

export const statiTokenCollection = new Proxy({}, {
  get: () => staticToken,
});

export const StaticComponent: FC<any> = () => {
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    console.warn('You are rendering a static component in the browser.  Wrap it in withoutHydration');
  }
  return null;
};
