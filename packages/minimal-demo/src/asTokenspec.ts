import { DesignableComponents, asTokenSpec as asTokenSpecBase } from '@bodiless/fclasses';

const domains = {
  Core: {},
  Schema: {},
  Layout: {},
  Theme: {},
  Meta: {},
  Editors: {},
};

type D = typeof domains;

const asTokenSpec = <C extends DesignableComponents>() => asTokenSpecBase<C, D>(domains);

export { asTokenSpec };
