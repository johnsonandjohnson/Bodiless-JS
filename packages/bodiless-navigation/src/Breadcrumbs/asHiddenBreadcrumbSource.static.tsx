import React from 'react';
import { HOC } from '@bodiless/fclasses';

const asHiddenBreadcrumbSource: HOC = Component => (props: any) => <Component {...props} />;

export default asHiddenBreadcrumbSource;
