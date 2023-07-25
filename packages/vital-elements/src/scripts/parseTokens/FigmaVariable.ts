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
} from './types';

class FigmaVariable implements FigmaVariableInterface {
  protected segments: string[];

  readonly name: string;

  readonly type?: string;

  readonly isAlias?: boolean;

  readonly collection?: Collections;

  readonly mode?: string;

  readonly value?: string|AliasValue;

  readonly errors = new Set<string>();

  protected interactiveTarget?: ColorTargets;

  constructor(variable$: string|RawVariable) {
    const variable: RawVariable = typeof variable$ === 'string' ? { name: variable$ } : variable$;
    Object.assign(this, variable);
    this.name = variable.name;
    this.segments = this.name.split('/');
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
    if (this.collection !== Collections.Brand || this.level !== Levels.Component) return false;
    return true;
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

  toVitalTokenName(target?: ColorTargets) {
    const cleanedName = this.segments.slice(2).map(s => s.replace(/[ \-,]/g, '')).join('');
    return `${target || ''}${cleanedName}`;
  }

  get vitalName(): string {
    return this.isInteractive && isColorVariable(this)
      ? this.toVitalTokenName(this.target)
      : this.toVitalTokenName();
  }

  toTwColorName(target: ColorTargets, state: States = States.Idle): string {
    const cleanedName = this.segments.slice(1).join('/').replace(/[/ ]/g, '-')
      .toLowerCase();
    const statePrefix = TwStatePrefixes[state];
    const typePrefix = TwColorTargetPrefixes[target];
    return `${statePrefix}${typePrefix}${cleanedName}`;
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
    if (this.type === Types.Color) return Categories.Color;
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

  setInteractiveTarget(target: ColorTargets) {
    this.interactiveTarget = target;
  }

  get parsedValue(): string|undefined {
    if (isRadiusVariable(this)) {
      const prefix = `rounded${TwCorners[this.corner]}`;
      const valueSegments = this.alias?.name.split('/') || [];
      const rawValue = valueSegments[valueSegments.length - 1];
      try {
        const iValue = parseInt(rawValue.replace('Rounded ', ''), 10);
        return `'${prefix}-${iValue}px'`;
      } catch (e) {
        this.errors.add(`Could not convert "${rawValue}" to number`);
        return undefined;
      }
    }
    if (isSpacingVariable(this)) {
      const prefix = `${TwSpacingPrefixes[this.target]}${TwSides[this.side]}`;
      const valueSegments = this.alias?.name.split('/') || [];
      const value = valueSegments[valueSegments.length - 1];
      return `'${prefix}-${value}px'`;
    }
    if (isColorVariable(this)) {
      if (this.isComponent) {
        const value = this.alias?.toVitalTokenName(
          this.alias.isInteractive ? this.target : undefined
        );
        return value && `vitalColor.${value}`;
      }
      // @TODO Correct parsed value for semantic color vars.
      const value = this.alias?.toTwColorName(this.target, this.state);
      return value && `'${value}'`;
    }
    this.errors.add('Unknown variable type');
    return undefined;
  }
}

export default FigmaVariable;
