import {
  ComponentOrTag, DesignableComponentsProps, DesignableProps
} from '@bodiless/fclasses';

export enum FancyBorderColor {
  Red = 'red',
  Blue = 'blue',
}

export type FancyBorderProps = {
  color: FancyBorderColor,
};

export type DialogComponents = {
  Border: ComponentOrTag<any>,
  TitleWrapper: ComponentOrTag<any>,
  Title: ComponentOrTag<any>,
  MessageWrapper: ComponentOrTag<any>,
  Message: ComponentOrTag<any>,
};

export type DialogProps = DesignableProps<DialogComponents>;

export type DialogBaseProps = DesignableComponentsProps<DialogComponents>;
