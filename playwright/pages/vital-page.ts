export abstract class VitalPage {
  readonly relativeUrl: string;

  readonly mainContentSelector: string;

  constructor(relativeUrl: string) {
    this.relativeUrl = relativeUrl;
    this.mainContentSelector = 'main-content';
  }

  abstract getElements(): VitalElement[];
}

export type VitalElement = {
  id: string,
  name?: string
};
