/* eslint-disable no-console */
import {
  ColorTargets, TwColorTargetPrefixes, States, TwStatePrefixes,
  Levels, isLevel, Variable, Collections, AliasValue, isColorTarget, SpacingTargets,
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
} from './types';

class FigmaVariable implements Variable, FigmaVariableInterface {
  protected segments: string[];

  readonly name: string;

  readonly type?: string;

  readonly isAlias?: boolean;

  readonly collection?: Collections;

  readonly mode?: string;

  readonly value?: string|AliasValue;

  readonly errors = new Set<string>();

  constructor(variable$: string|Variable) {
    const variable: Variable = typeof variable$ === 'string' ? { name: variable$ } : variable$;
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
    if (!isAliasVariable(this)) return undefined;
    return new FigmaVariable(this.value);
  }

  get isColor(): boolean {
    return (this.type === Types.Color);
  }

  validate(): boolean {
    // @todo validation for core variables.
    if (this.isCore) return true;
    if (this.isComponent) {
      if (!this.componentName) {
        this.errors.add('Component variable has no component');
        return false;
      }
    }
    if (!isAliasVariable(this)) {
      this.errors.add(`Non-core value "${this.value}" is not an alias`);
      return false;
    }
    if (isRadiusVariable(this)) {
      if (this.alias?.collection !== Collections.Core) {
        this.errors.add(`Radius alias collection "${this.alias.collection}" is not core`);
        return false;
      }
      return true;
    }
    if (isSpacingVariable(this)) {
      if (this.alias?.collection !== Collections.Core) {
        this.errors.add(`Spaing alias collection "${this.alias.collection}" is not core`);
        return false;
      }
      if (!isSpacingTarget(this.target)) {
        this.errors.add(`Invalid spacing target ${this.target}`);
      }
      return true;
    }
    if (isColorVariable(this)) {
      if (this.isComponent) {
        if (!this.alias.isSemantic) {
          this.errors.add(`Component color alias "(${this.alias.name}" is not semantic`);
          return false;
        }
        if (!isColorTarget(this.target)) {
          this.errors.add(`Component color target "${this.target}" invalid`);
          return false;
        }
      } else if (!isColorTarget(this.target) && !this.isInteractive) {
        this.errors.add(`Semantic color target "${this.target}" invalid`);
        return false;
      }
      return true;
    }
    this.errors.add('Could not determine variable tupe');
    return false;
  }

  get isComponent(): boolean {
    if (this.collection !== Collections.Brand || this.level !== Levels.Component) return false;
    return true;
  }

  get isCore(): Boolean {
    return this.collection === Collections.Core;
  }

  get isSemantic(): boolean {
    return this.collection === Collections.Brand && this.level === Levels.Semantic;
  }

  toString() {
    return JSON.stringify(this);
  }

  get isSpacing(): boolean {
    return this.isComponent && isSpacingTarget(this.target);
  }

  get isRadius(): boolean {
    return this.isComponent && this.target === BORDER_RADIUS;
  }

  get level(): Levels|undefined {
    return isLevel(this.segments[0]) ? this.segments[0] : undefined;
  }

  get componentName(): string {
    return this.segments[1]?.replace(/ /g, '').replace(/-/g, '_');
  }

  protected findTarget(): [
    number,
    ColorTargets | SpacingTargets | typeof BORDER_RADIUS | undefined
  ] {
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

  get target(): ColorTargets | SpacingTargets | typeof BORDER_RADIUS | undefined {
    const [_, target] = this.findTarget();
    return target;
  }

  get state(): States | undefined {
    const state = this.findSegment('State', isState);
    if (!state) {
      this.errors.add('Could not find a valid state');
    }
    return state;
  }

  toVitalTokenName(target?: ColorTargets) {
    const cleanedName = this.segments.slice(2).map(s => s.replace(/[ \-,]/g, '')).join('');
    return `${target || ''}${cleanedName}`;
  }

  toTwColorName(target: ColorTargets, state: States = States.Idle): string {
    const cleanedName = this.segments.slice(1).join('/').replace(/[/ ]/g, '-').replace(/%/g, '')
      .toLowerCase();
    const statePrefix = TwStatePrefixes[state];
    const typePrefix = TwColorTargetPrefixes[target];
    return `'${statePrefix}${typePrefix}${cleanedName}'`;
  }

  findSegment<T extends string>(
    label: string,
    condition: (s: string) => s is T,
    after: number = 1,
  ): T|undefined {
    const candidates = this.segments.map((s, ix) => (condition(s) ? ix : -1))
      .filter(ix => ix >= 0)
      .filter(ix => ix! > after);
    if (candidates.length === 0) {
      this.errors.add(`Could not find ${label} segment`);
      return undefined;
    }
    if (candidates.length > 1) {
      this.errors.add(`Found mmultiple ${label} segments`);
    }
    return this.segments[candidates[0]] as T;
  }

  get side(): Sides|undefined {
    const side = this.findSegment('Side', isSide);
    return isSide(side) ? side : Sides.ALL;
  }

  get corner(): Corners|undefined {
    const corner = this.findSegment('Corner', isCorner);
    return isCorner(corner) ? corner: Corners.ALL;
  }

  /**
   * Returns the parsed value guaranteeing that it belongs to the set of allowed values.
   *
   * @param allowedValues
   *
   * @returns
   */
  validatedValue(allowedValues?: string[]): string|undefined {
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

  get parsedValue(): string|undefined {
    if (!this.validate()) return undefined;
    if (isRadiusVariable(this)) {
      const prefix = `rounded${TwCorners[this.corner]}`;
      const valueSegments = this.alias.name.split('/');
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
      const valueSegments = this.alias.name.split('/');
      const value = valueSegments[valueSegments.length - 1];
      return `'${prefix}-${value}px'`;
    }
    if (isColorVariable(this) && this.isComponent) {
      const value = this.alias.toVitalTokenName(
        this.alias.isInteractive ? this.target : undefined
      );
      return `vitalColor.${value}`;
    }
    this.errors.add('Could not parse value');
    return undefined;
  }
}

export default FigmaVariable;
