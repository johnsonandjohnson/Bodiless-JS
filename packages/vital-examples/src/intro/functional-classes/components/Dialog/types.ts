import {
  ComponentOrTag, DesignableComponentsProps, DesignableProps
} from '@bodiless/fclasses';

export type DialogComponents = {
  Border: ComponentOrTag<any>,
  TitleWrapper: ComponentOrTag<any>,
  Title: ComponentOrTag<any>,
  MessageWrapper: ComponentOrTag<any>,
  Message: ComponentOrTag<any>,
};

export type DialogProps = DesignableProps<DialogComponents>;

export type DialogBaseProps = DesignableComponentsProps<DialogComponents>;
