/**
 * A normalized variable with all attributes calculated.
 */
export type NormalVariable = {
  /**
   * The token level (Core, Semantic or Component)
   */
  level?: string,
  /**
   * For component tokens, the component/subcomponent/variant to which the token applies, eg
   * `CardPrimaryTitle`.  For Semantic tokens this is "All".
   */
  component?: string,
  /**
   * The token category (eg Color, Spacing, Radius)
   */
  category?: string,
  /**
   * The specific css property to which the token applies
   * eg. Text/Background/Border (for colors) or Padding/Margin for Spacing.
   */
  target?: string,
  /**
   * Some properties can be further qualified
   * eg Spacing can be Top/Bottom/etc
   */
  subTarget?: string,
  /**
   * The interactive state to which the variable applies
   * eg Active/Hover/etc...
   */
  state?: string,
  /**
   * The device size at which the token applies
   * eg Mobile/Tablet/Desktop
   */
  viewport?: string,
  /**
   * The theme for which the token applies (used only for color variables)
   * Light/Dark
   */
  theme?: string,
  /**
   * The value of the token suitable for use in code
   */
  parsedValue?: string,
};

export type FigmaVariableInterface = NormalVariable & RawVariable & {
  isColor: boolean,
  isSpacing: boolean,
  isRadius: boolean,
  isInteractive: boolean,
  isSemantic: boolean,
  isComponent: boolean,
  errors: Set<string>,
  setErrors: (errors: string|Set<string>|string[]) => void,
  level?: Levels,
  theme?: Themes,
  validatedValue: (allowedValues?: string[]) => string|undefined;
  longName: string,
  resolveSemanticAlias: (variables: FigmaVariableInterface[]) => FigmaVariableInterface|undefined;
  validate: () => boolean,
  vitalName: string,
  createInteractiveVariants: () => FigmaVariableInterface[],
};

export const BORDER_RADIUS = 'Border Radius';

export interface ComponentVariable extends FigmaVariableInterface {
  componentName: string,
}
export const isComponentVariable = (
  v?: FigmaVariableInterface
): v is ComponentVariable => Boolean(v && v.isComponent);

export interface ColorVariable extends FigmaVariableInterface {
  target: ColorTargets,
  state: States,
  theme: Themes,
}

export const isColorVariable = (
  v?: FigmaVariableInterface
): v is ColorVariable => Boolean(v && v.isColor);

export interface SpacingVariable extends FigmaVariableInterface {
  target: SpacingTargets,
  side: Sides,
}

export const isSpacingVariable = (
  v?: FigmaVariableInterface
): v is SpacingVariable => Boolean(v && v.isSpacing);

export interface RadiusVariable extends FigmaVariableInterface {
  target: typeof BORDER_RADIUS,
  corner: Corners,
}

export const isRadiusVariable = (
  v?: FigmaVariableInterface
): v is RadiusVariable => Boolean(v && v.isRadius);

export enum Viewports {
  Mobile = 'Mobile',
  Tablet = 'Tablet',
  Desktop = 'Desktop',
}

export const isViewport = (
  s?: string
): s is Viewports => Boolean(s && Object.values(Viewports).includes(s as Viewports));

export enum Categories {
  Spacing = 'Spacing',
  Color = 'Color',
  Radius = 'BorderRadius',
}

export const isCategory = (
  s?: string
): s is Categories => Boolean(s && Object.values(Categories).includes(s as Categories));

export enum Themes {
  Light = 'Light Theme',
  Dark = 'Dark Theme',
}

export const isTheme = (
  s?: string
): s is Themes => Boolean(s && Object.values(Themes).includes(s as Themes));

export enum Collections {
  Core = 'Core Values',
  Brand = 'Brand Tokens',
  Device = 'Device Tokens'
}

export enum Brands {
  Kenvue = 'White Label',
  Motrin = 'Motrin',
}

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

export const TwColorTargetPrefixes: Record<ColorTargets, string> = {
  Border: 'border-',
  Background: 'bg-',
  Text: 'text-',
  Scrollbar: 'scrollbar-',
};

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
  Disabled: 'disabled:',
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

export enum Devices {
  Mobile = 'Mobile',
  Tablet = 'Tablet',
  Desktop = 'Desktop',
}

export const isDevice = (
  d?: string
): d is Devices => Boolean(d && Object.values(Devices).includes(d as Devices));

export const TwDevicePrefixes: Record<Devices, string> = {
  Mobile: '',
  Tablet: 'md:',
  Desktop: 'lg:',
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
  X = 'SidesX',
  Y = 'SidesY',
  ALL = 'All',
}

export const TwSides: Record<Sides, string> = {
  Left: 'l',
  Right: 'r',
  Top: 't',
  Bottom: 'b',
  SidesX: 'x',
  SidesY: 'y',
  All: '',
};

export const isSide = (
  s?: string
): s is Sides => Boolean(s && Object.values(Sides).includes(s as Sides));

export type Targets = ColorTargets|SpacingTargets|typeof BORDER_RADIUS;

export const isTarget = (
  s?: string
): s is Targets => isColorTarget(s) || isSpacingTarget(s) || s === BORDER_RADIUS;

export type SubTargets = Sides|Corners;
export const isSubTarget = (
  s?: string
): s is SubTargets => isSide(s) || isCorner(s);

export const isReserved = (
  s?: string
): boolean => isSubTarget(s) || isTarget(s) || isTheme(s) || isState(s) || isViewport(s);

// RAW DATA DEFINITIONS

export type Data = {
  version: string;
  collections: Collection[];
};

type Collection = {
  name: string;
  modes: Mode[];
};

export type Mode = {
  name: string;
  variables: RawVariable[];
};

export type AliasValue = {
  collection: string;
  name: string;
};

export type RawVariable = {
  name: string;
  type?: string;
  isAlias?: boolean;
  collection?: string;
  mode?: string;
  value?: any;
};

export type AliasVariable = Omit<RawVariable, 'value'> & {
  value: AliasValue;
};

export const isAliasVariable = (v?: RawVariable): v is AliasVariable => Boolean(v?.isAlias);
