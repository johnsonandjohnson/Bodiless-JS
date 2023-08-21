/* eslint-disable no-console */
import {
  ColorTargets, TwColorTargetPrefixes, States, TwStatePrefixes,
  Levels, RawVariable, Collections, AliasValue, isColorTarget, SpacingTargets,
  isSpacingTarget,
  isSide,
  TwSpacingPrefixes,
  Sides,
  TwSides,
  isAliasVariable,
  Types,
  FigmaVariableInterface,
  isSpacingVariable,
  isColorVariable,
  BORDER_RADIUS,
  Corners,
  isCorner,
  isState,
  isRadiusVariable,
  TwCorners,
  isComponentVariable,
  isReserved,
  Categories,
  SubTargets,
  Viewports,
  isViewport,
  isTheme,
  Themes,
  isDevice,
  TwDevicePrefixes,
  NormalVariable,
} from './types';

class FigmaVariable implements FigmaVariableInterface {
  protected segments: string[];

  readonly name: string;

  readonly type?: string;

  readonly isAlias?: boolean;

  readonly collection?: Collections;

  readonly mode?: string;

  readonly value?: string|AliasValue;

  readonly errors: Set<string> = new Set<string>();

  protected interactiveTarget?: ColorTargets;

  static sanitize(s: string) {
    return s.replace(/[ -/.]/g, '').replace(/-/g, '_');
  }

  constructor(variable$: string|RawVariable) {
    const variable: RawVariable = typeof variable$ === 'string' ? { name: variable$ } : variable$;
    Object.assign(this, variable);
    this.name = variable.name;
    this.segments = this.name.split('/');
    // Copy errors to a new set.
    const { errors } = this;
    this.errors = new Set<string>(errors.values());
  }

  get isInteractive() {
    return this.segments[2] === 'Interactive';
  }

  get longName() {
    return `${this.collection}/${this.mode}/${this.name}`;
  }

  resolveSemanticAlias(
    vars: FigmaVariableInterface[], v$?: FigmaVariableInterface, depth = 0
  ): FigmaVariableInterface|undefined {
    const v = v$ || this;
    if (!isAliasVariable(v) || v.value.collection === Collections.Core) return v;
    if (v.value.collection !== Collections.Brand) {
      this.errors.add(`Attempt to resolve alias to ${v.value.collection}`);
      return undefined;
    }
    if (depth > 10) {
      this.errors.add('Max depth exceeded resolving alias');
      return undefined;
    }
    const reference = vars?.find(vv => vv.name === v.value.name);
    if (!reference) {
      this.errors.add(`Reference not found "${v.value.collection}/${v.value.name}"`);
      return undefined;
    }
    return this.resolveSemanticAlias(vars, reference, depth + 1);
  }

  get alias(): FigmaVariable|undefined {
    if (!isAliasVariable(this)) {
      this.errors.add(`KNOWN ISSUE: Non-core value "${this.value}" is not an alias`);
      return undefined;
    }
    const alias = new FigmaVariable(this.value);
    if (this.collection === Collections.Device && !alias.isCore) {
      // @TODO Handle this case. Sometimes device variables may point to brand variables
      // if a brand needs to customized them.
      // Also - some device tokens point to other device tokens which appear to be
      // semantic - eg /Spacing/X Small'.  Is this real?
      this.errors.add(`Device alias collection "${alias.longName}" is not core`);
    }
    if (this.category === Categories.Radius) {
      if (!alias.isCore) this.errors.add(`Radius alias collection "${alias.longName}" is not core`);
    }
    if (this.category === Categories.Spacing) {
      if (!alias.isCore) {
        this.errors.add(`Spcaing alias collection "${alias.longName}" is not core`);
      }
    }
    if (this.isColor) {
      if (this.level === Levels.Component) {
        // @TODO Sometimes component color variables point to core:
        // eg `Components/Form Field/Border/Error` points to `Core/Color/Signal/Error/Error`
        // This currently raises an error but we need to handle it
        if (!alias.isSemantic) this.errors.add(`Component color alias "(${alias.longName}" is not semantic`);
        if (!alias.isBrand) this.errors.add(`Component color alias "(${alias.longName}" is not brand`);
      } else if (!alias.isCore) {
        this.errors.add(`Semantic color alias "(${alias.longName}" is not core`);
      }
    }
    return alias;
  }

  get isColor(): boolean {
    return this.category === Categories.Color;
  }

  protected findTarget(): [
    number,
    ColorTargets | SpacingTargets | typeof BORDER_RADIUS | undefined
  ] {
    // IMPORTANT NOTE! THIS METHOD MUST NOT CALL ANY TYPE GUARDS AS IT IS USED BY THEM!!!

    // Special cases for some components
    if (this.componentName === 'ScrollIndicator') return [-1, ColorTargets.Scrollbar];
    if (this.componentName === 'Divider') return [-2, ColorTargets.Border];

    // The target can be in segment 2, 3 or 4
    for (let s = 2; s <= 4; s += 1) {
      const seg = this.segments[s];
      if (isColorTarget(seg)) return [s, seg];
      // For no-component tokens, only color targets are supported and only in segment 2
      if (!this.isComponent) break;
      if (isSpacingTarget(seg)) return [s, seg];
      if (seg === BORDER_RADIUS) return [s, seg];
    }
    return [-1, undefined];
  }

  get isComponent(): boolean {
    return this.level === Levels.Component;
  }

  get isCore(): Boolean {
    return this.level === Levels.Core;
  }

  get isBrand(): Boolean {
    return this.collection === Collections.Brand;
  }

  get isSemantic(): boolean {
    return this.level === Levels.Semantic;
  }

  get isSpacing(): boolean {
    return this.category === Categories.Spacing;
  }

  get isRadius(): boolean {
    return this.category === Categories.Radius;
  }

  get level(): Levels|undefined {
    if (this.collection === Collections.Core) return Levels.Core;
    const level = this.segments[0];
    if (level === Levels.Semantic) {
      if (this.collection !== Collections.Brand) {
        this.errors.add(`Semantic variable in "${this.collection}" collection.`);
      }
      return Levels.Semantic;
    }
    if (level === Levels.Component) return Levels.Component;
    return undefined;
  }

  get componentName(): string|undefined {
    if (!isComponentVariable(this)) return undefined;
    const componentName = this.segments[1]?.replace(/ /g, '').replace(/-/g, '_');
    if (isComponentVariable(this)) {
      if (!componentName) {
        this.errors.add('Component variable has no component');
      } else if (isReserved(componentName)) {
        this.errors.add(`Reserved component name "${componentName}`);
      }
    }
    return componentName;
  }

  get target(): ColorTargets | SpacingTargets | typeof BORDER_RADIUS | undefined {
    const [_, target] = this.findTarget();
    if (isColorVariable(this)) {
      if (this.isInteractive) {
        if (this.interactiveTarget) return this.interactiveTarget;
      } else if (!isColorTarget(target)) {
        this.errors.add(`Component color target "${target}" invalid`);
      }
    }
    if (isSpacingVariable(this) && !isSpacingTarget(target)) {
      this.errors.add(`Invalid spacing target ${target}`);
    }
    if (isRadiusVariable(this) && target !== BORDER_RADIUS) {
      this.errors.add(`Invalid radius target ${target}`);
    }
    return target;
  }

  get state(): States | undefined {
    const state = this.segments.find(isState);
    if (!state && this.isInteractive) this.errors.add('Could not find a valid state');
    return state;
  }

  get side(): Sides|undefined {
    const side = this.segments.find(isSide);
    return isSide(side) ? side : Sides.ALL;
  }

  get corner(): Corners|undefined {
    const corner = this.segments.find(isCorner);
    return isCorner(corner) ? corner: Corners.ALL;
  }

  get vitalName(): string {
    const cleanedName = this.segments.slice(2).map(s => s.replace(/[ \-,]/g, '')).join('');
    return this.isInteractive && isColorVariable(this)
      ? `${this.target}${cleanedName}` : cleanedName;
  }

  /**
   * Returns the parsed value guaranteeing that it belongs to the set of allowed values.
   *
   * @param allowedValues
   *
   * @returns
   */
  validatedValue(allowedValues?: string[]): string|undefined {
    if (!this.validate()) return undefined;
    if (this.parsedValue) {
      const simpleValue = this.isColor
        ? this.parsedValue.replace('vitalColor.', '')
        : this.parsedValue.replace(/'/g, '');
      if (allowedValues && !allowedValues.includes(simpleValue)) {
        this.errors.add(`Semantic token for value "${simpleValue}" not found`);
        return undefined;
      }
    }
    return this.parsedValue;
  }

  /**
   * The component name with any variants or subcomponents attached.
   */
  get longComponentName() {
    if (!isComponentVariable(this)) return undefined;
    const longComponentSegments: string[] = [this.componentName];
    for (let s = 1; s < this.segments.length - 1; s += 1) {
      if (isReserved(this.segments[s])) break;
      longComponentSegments.push(this.segments[s]);
    }
    return longComponentSegments.join('-');
  }

  get category(): Categories|undefined {
    if (this.type === Types.Color || (!this.type && this.segments[1] === Categories.Color)) {
      return Categories.Color;
    }
    const [_, target] = this.findTarget();
    if (this.isComponent && isSpacingTarget(target)) return Categories.Spacing;
    if (this.isComponent && target === BORDER_RADIUS) return Categories.Radius;
    return undefined;
  }

  get component(): string|undefined {
    if (isComponentVariable(this)) return this.longComponentName;
    return undefined;
  }

  validate() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.normalName && this.parsedValue;
    return this.errors.size === 0;
  }

  get subTarget(): SubTargets|undefined {
    if (isSpacingVariable(this)) return this.side;
    if (isRadiusVariable(this)) return this.corner;
    return undefined;
  }

  get viewport(): Viewports|undefined {
    if (this.collection === Collections.Device) {
      if (isViewport(this.mode)) return this.mode;
      this.errors.add(`Non-viewport mode "${this.mode}" for device variable`);
    }
    return this.segments.find(isViewport);
  }

  get normalJson(): Required<NormalVariable> {
    const {
      level = 'undefined',
      component = 'undefined',
      category = 'undefined',
      viewport = 'undefined',
      theme = 'undefined',
      target = 'undefined',
      subTarget = 'undefined',
      state = 'undefined',
      parsedValue = 'undefined',
    } = this;
    return {
      level,
      component,
      category,
      viewport,
      theme,
      target,
      subTarget,
      state,
      parsedValue,
    };
  }

  get normalName(): string {
    const segments = [
      this.level,
      this.component,
      this.category,
      this.target,
      this.subTarget,
      this.state,
      this.viewport,
    ];
    return segments.join('/');
  }

  protected setInteractiveTarget(target: ColorTargets) {
    this.interactiveTarget = target;
  }

  setErrors(errors: string|Set<string>|string[]) {
    if (typeof errors === 'string') this.errors.add(errors);
    else errors.forEach(e => this.errors.add(e));
  }

  createInteractiveVariants(): FigmaVariable[] {
    if (!this.isInteractive) return [this];
    return Object.values(ColorTargets).map(target => {
      const variant = new FigmaVariable(this);
      variant.setInteractiveTarget(target);
      return variant;
    });
  }

  // @TODO add createThemeVariants to add a dark version of any semantic color
  // which does not have a theme
  // createThemeVariants(): FigmaVariable[] {
  //   if (!this.isSemantic || !this.isColor || this.theme) return [this];
  //   ...
  // }

  get theme(): Themes|undefined {
    return this.segments.find(isTheme);
  }

  get parsedValue(): string|undefined {
    let devicePrefix = '';
    if (this.collection === Collections.Device && isDevice(this.mode)) {
      devicePrefix = TwDevicePrefixes[this.mode];
    }
    if (isRadiusVariable(this)) {
      const prefix = `rounded${TwCorners[this.corner]}`;
      const valueSegments = this.alias?.name.split('/') || [];
      const rawValue = valueSegments[valueSegments.length - 1];
      try {
        const iValue = parseInt(rawValue.replace('Rounded ', ''), 10);
        return `'${devicePrefix}${prefix}-${iValue}px'`;
      } catch (e) {
        this.errors.add(`Could not convert "${rawValue}" to number`);
        return undefined;
      }
    }
    if (isSpacingVariable(this)) {
      const prefix = `${TwSpacingPrefixes[this.target]}${TwSides[this.side]}`;
      const valueSegments = this.alias?.name.split('/') || [];
      const value = valueSegments[valueSegments.length - 1];
      return `'${devicePrefix}${prefix}-${value}px'`;
    }
    if (isColorVariable(this)) {
      if (this.isComponent) {
        // @TODO Check with Jordan to see if this is expected.  Current understanding
        // is that Brand variables should always have a theme, and that Theme variables
        // point to both the Light and Dark versions of the Brand variable. If this is
        // expected, remove the check.
        if (this.collection === Collections.Brand && !this.theme) {
          this.errors.add('Brand variable has no theme');
        }
        const { alias } = this;
        // @TODO Dark Theme support
        // Ensure that all dark theme component variables point to dark theme semantic ones,
        // and that all light theme component variables point to light (or unthemed) semantic ones
        // bc dark theme tailwind classes use the 'dark:' prefix.
        // if (this.theme === Themes.Dark) {
        //   if (!this.alias?.theme) {
        //     // @TODO Force the alias to dark theme if it has no theme
        //   } else if (this.alias.theme !== Themes.Dark) {
        //     // @TODO Raise an error if the alias has a light theme.
        //   }
        // } else if (this.alias?.theme === Themes.Dark) {
        //    // @TODO Raise an error if a
        // }
        if (alias?.isInteractive) alias.setInteractiveTarget(this.target);
        const value = alias?.vitalName;
        return value && `vitalColor.${value}`;
      }
      if (this.alias) {
        const replacements: { [key:string]: string } = { '%': '', '/': '-', ' ': '-' };
        const cleanedName = this.alias.segments
          .slice(1)
          .join('/')
          .replace(/[/% ]/g, m => replacements[m])
          .toLowerCase();
        const statePrefix = TwStatePrefixes[this.state || States.Idle];
        const targetPrefix = TwColorTargetPrefixes[this.target];
        const themePrefix = this.theme === Themes.Dark ? 'dark:' : '';
        return `'${statePrefix}${themePrefix}${targetPrefix}${cleanedName}'`;
      }
      return undefined;
    }
    this.errors.add('Unknown variable type');
    return undefined;
  }
}

export default FigmaVariable;
