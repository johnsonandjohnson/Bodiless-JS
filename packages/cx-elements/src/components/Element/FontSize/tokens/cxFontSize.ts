import { asTokenGroup } from '../../../../util';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['FontSize'],
  },
};

export default asTokenGroup(meta)({
  Base: 'text-m-base lg:text-base',
  XXXL: 'text-m-3xl lg:text-3xl',
  XXL: 'text-m-2xl lg:text-2xl',
  XL: 'text-m-xl lg:text-xl',
  L: 'text-m-lg lg:text-lg',
  XS: 'text-m-xs lg:text-xs',
});
