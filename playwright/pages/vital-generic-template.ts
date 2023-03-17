import { VitalElement, VitalPage } from './vital-page';

export class VitalGenericTemplatePage extends VitalPage {
  constructor() {
    super('/styleguide/generic-template/');
  }

  getElements(): VitalElement[] {
    return [
      { id: this.mainContentSelector, name: 'Generic Template Element' }
    ];
  }
}
