import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class Thankyou extends NavigationMixin(LightningElement) {
    handleback(){
        let cmpDef = {
            componentDef: 'c:wizardPage'
        };
        let encodedDef = btoa(JSON.stringify(cmpDef));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + encodedDef
            }
        });
}
}