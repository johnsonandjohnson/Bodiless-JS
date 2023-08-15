export interface FigmaVariableInterface extends Variable {
  isColor: boolean,
  isSpacing: boolean,
  isRadius: boolean,
  target?: ColorTargets | SpacingTargets | typeof BORDER_RADIUS;
  isInteractive: boolean,
  toVitalTokenName: (target?: ColorTargets) => string,
  isSemantic: boolean,
  isComponent: boolean,
  errors: Set<string>,
  level?: Levels,
  validate: () => boolean,
  parsedValue?: string,
  validatedValue: (allowedValues?: string[]) => string|undefined;
  longName: string,
  resolveSemanticAlias: (variables: FigmaVariableInterface[]) => FigmaVariableInterface|undefined;
}

export const BORDER_RADIUS = 'Border Radius';

export interface ComponentVariable extends FigmaVariableInterface {
  componentName: string,
}
export const isComponentVariable = (
  v?: FigmaVariableInterface
): v is ComponentVariable => Boolean(v && v.isComponent);

export interface ColorVariable extends FigmaVariableInterface {
  target: ColorTargets,
  alias: ColorVariable,
  state: States,
  toTwColorName: (target: ColorTargets, state?: States) => string,
}

export const isColorVariable = (
  v?: FigmaVariableInterface
): v is ColorVariable => Boolean(v && v.isColor);

export interface SpacingVariable extends FigmaVariableInterface {
  target: SpacingTargets,
  side: Sides,
  alias: FigmaVariableInterface,
}

export const isSpacingVariable = (
  v?: FigmaVariableInterface
): v is SpacingVariable => Boolean(v && v.isSpacing);

export interface RadiusVariable extends FigmaVariableInterface {
  target: typeof BORDER_RADIUS,
  corner: Corners,
  alias: FigmaVariableInterface,
}

export const isRadiusVariable = (
  v?: FigmaVariableInterface
): v is RadiusVariable => Boolean(v && v.isRadius);

export enum Collections {
  Core = 'Core Values',
  Brand = 'Brand Tokens',
  Device = 'Device Tokens'
}

export enum Brands {
  Kenvue = 'White Label',
  Motrin = 'Motrin',
}

/**
 * Figma variable types.
 */
export enum Types {
  Color = 'color',
  Number = 'number',
}

export enum Levels {
  Component = 'Components',
  Semantic = 'Semantic',
  Core = 'Core',
}

export const isLevel = (l?: string): l is Levels => Object.values(Levels).includes(l as Levels);

export enum ColorTargets {
  Border = 'Border',
  Background = 'Background',
  Text = 'Text',
  Scrollbar = 'Scrollbar'
}
export const isColorTarget = (
  t?: string
): t is ColorTargets => !!t && Object.values(ColorTargets).includes(t as ColorTargets);

export enum States {
  Idle = 'Idle',
  Hover = 'Hover',
  Disabled = 'Disabled',
  Pressed = 'Pressed',
  Focus = 'Focus'
}

export const isState = (s?: string): s is States => Boolean(
  s && Object.values(States).includes(s as States)
);

export const TwStatePrefixes: Partial<Record<States, string>> = {
  Idle: '',
  Hover: 'hover:',
  // @todo Is there a tw resposive variant for disabled?
  Disabled: 'aria-disabled:',
  Pressed: 'active:',
  Focus: 'focus:',
};

export enum SpacingTargets {
  Padding = 'Padding',
  Margin = 'Margin',
}

export const isSpacingTarget = (
  t?: string
): t is SpacingTargets => !!t && Object.values(SpacingTargets).includes(t as SpacingTargets);

export const TwSpacingPrefixes: Record<SpacingTargets, string> = {
  Padding: 'p',
  Margin: 'm',
};

export enum Corners {
  Left = 'Left',
  Right = 'Right',
  Top = 'Top',
  Bottom = 'Bottom',
  TopRight = 'Top Right',
  TopLeft = 'Top Left',
  BottomRight = 'Bottom Right',
  BottomLeft = 'Bottom Left',
  ALL = 'ALL',
}

export const isCorner = (
  s?: string
): s is Corners => Boolean(s && Object.values(Corners).includes(s as Corners));

export const TwCorners: Record<Corners, string> = {
  Left: '-l',
  Right: '-r',
  Top: '-t',
  Bottom: '-b',
  'Top Right': '-tr',
  'Top Left': '-tl',
  'Bottom Right': '-br',
  'Bottom Left': '-bl',
  ALL: '',
};

export enum Sides {
  Left = 'Left',
  Right = 'Right',
  Top = 'Top',
  Bottom = 'Bottom',
  X = 'X',
  Y = 'Y',
  ALL = 'ALL',
}

export const TwSides: Record<Sides, string> = {
  Left: 'l',
  Right: 'r',
  Top: 't',
  Bottom: 'b',
  X: 'x',
  Y: 'y',
  ALL: '',
};

export const isSide = (
  s?: string
): s is Sides => Boolean(s && Object.values(Sides).includes(s as Sides));

export const TwColorTargetPrefixes: Record<ColorTargets, string> = {
  Border: 'border-',
  Background: 'bg-',
  Text: 'text-',
  Scrollbar: 'scrollbar-',
};

export type Data = {
  version: string;
  collections: Collection[];
};

export type Mode = {
  name: string;
  variables: Variable[];
};

export type AliasValue = {
  collection: string;
  name: string;
};

export type Variable = {
  name: string;
  type?: string;
  isAlias?: boolean;
  collection?: string;
  mode?: string;
  value?: any;
};

export type AliasVariable = Omit<Variable, 'value'> & {
  value: AliasValue;
};

export const isAliasVariable = (v?: Variable): v is AliasVariable => Boolean(v?.isAlias);

type Collection = {
  name: string;
  modes: Mode[];
};
