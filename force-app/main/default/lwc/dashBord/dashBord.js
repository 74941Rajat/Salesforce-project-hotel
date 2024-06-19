import { LightningElement } from 'lwc';
import getCustomers from '@salesforce/apex/test.getCustomers';
import getReservations from '@salesforce/apex/test.getReservations';
export default class DashBord extends LightningElement {
    customers=[];
    reservation=[];
    showCustomer=false;
    showReservation=false;
    getCustomers(){
        getCustomers()
        .then(result=>{
            this.customers=result;
            this.showCustomer=true;
         })
        .catch(error=>{
            console.error(error);
          }); 
       
    }
    HideCustomers(){
        this.showCustomer=false;
    }
    getReservation(){
        getReservations()
        .then(result=>{
            this.reservation=result;
            this.showReservation=true;
        })
        .catch(error=>{
            console.error(error);
        });
    } 
    
    HideReservations(){
        this.showReservation=false;
    }
}