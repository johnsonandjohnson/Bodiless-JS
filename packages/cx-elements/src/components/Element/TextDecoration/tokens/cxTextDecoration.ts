import { asTokenGroup } from '../../../../util';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['FontDecoration'],
  },
};

export default asTokenGroup(meta)({
  Underline: 'underline',
  Bold: 'font-bold',
  ExtraBold: 'font-extrabold',
  Uppercase: 'uppercase',
  Medium: 'font-medium',
  Normal: 'font-normal',
  Superscript: 'align-baseline',
});
