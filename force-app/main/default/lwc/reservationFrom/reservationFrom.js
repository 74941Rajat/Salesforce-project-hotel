import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';

import Hotel1 from '@salesforce/resourceUrl/hotel1';
import Hotel2 from '@salesforce/resourceUrl/hotel2';

export default class ReservationFrom extends NavigationMixin(LightningElement) 
{
    recordid;
    handleSucces()
    {
       
        
        const  showToastEvent = new ShowToastEvent({
            title:'Success!',
            message : 'Room Booked! Enjoy your stay at permium Hotels',
            variant : 'success'
        });
        this.dispatchEvent(showToastEvent);



        let cmpDef = {
            componentDef: 'c:thankyou'
        };
        let encodedDef = btoa(JSON.stringify(cmpDef));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + encodedDef
            }
        });
    }


    handleSubmit(){

    }

   get background1(){
    return `height:50rem; 
    background-image: url(${Hotel1});
    background-size: cover;
    background-repeat: no-repeat;`;

   }
   get background2(){
    return `height:50rem; 
    background-image: url(${Hotel2});
    background-size: cover;
    background-repeat: no-repeat;`;
    
   }
}
