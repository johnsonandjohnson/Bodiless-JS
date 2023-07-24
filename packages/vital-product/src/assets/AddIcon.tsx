import React from 'react';
import { stylable } from '@bodiless/fclasses';

const Add = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="1" y="7" width="14" height="2" rx="1" />
    <rect x="9" y="1" width="14" height="2" rx="1" transform="rotate(90 9 1)" />
  </svg>
);

const AddIcon = stylable(Add);

export default AddIcon;
