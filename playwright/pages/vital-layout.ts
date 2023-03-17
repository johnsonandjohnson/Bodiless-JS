import { VitalElement, VitalPage } from "./vital-page";

export class VitalLayoutPage extends VitalPage {

    constructor() {
        super('/styleguide/layout/');
    }

    getElements(): VitalElement[] {
        return [
            { id: this.mainContentSelector, name: 'Layout Element' }
        ]
    }
}
