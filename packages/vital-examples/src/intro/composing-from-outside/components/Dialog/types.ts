export enum FancyBorderColor {
  Red = 'red',
  Blue = 'blue',
}

export type FancyBorderProps = {
  color: FancyBorderColor,
};

export type DialogProps = {
  title: string,
  message: string,
} & FancyBorderProps;
