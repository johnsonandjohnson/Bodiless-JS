import { VitalElement, VitalPage } from './vital-page';

export class VitalTypographyPage extends VitalPage {
  readonly typographyElements: TypographyElement[];

  constructor() {
    super('/styleguide/typography/');
    this.typographyElements = [
      {
        id: 'H1'
      },
      {
        id: 'H2'
      },
      {
        id: 'H3'
      },
      {
        id: 'H4'
      },
      {
        id: 'H5'
      },
      {
        id: 'Body'
      },
      {
        id: 'Eyebrow'
      },
      {
        id: 'Gradient'
      },
      {
        id: 'Rest'
      },
      {
        id: 'Link',
        isClickable: true
      }
    ];
  }

  getElements(): VitalElement[] {
    return this.typographyElements.map((tElement) => ({id: tElement.id}));
  }
}

type TypographyElement = {
  id: string,
  isClickable?: boolean
};
