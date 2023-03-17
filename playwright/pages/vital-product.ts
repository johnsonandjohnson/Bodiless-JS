import { VitalElement, VitalPage } from "./vital-page";

export class VitalProductPage extends VitalPage {

    constructor() {
        super('/styleguide/product/');
    }

    getElements(): VitalElement[] {
        return [
            { id: this.mainContentSelector, name: 'Product Element' }
        ]
    }
}
