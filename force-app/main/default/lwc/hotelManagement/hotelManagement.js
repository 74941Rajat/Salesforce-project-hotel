import { LightningElement } from 'lwc';
import background from '@salesforce/resourceUrl/hotel';

export default class HotelManagement extends LightningElement {
    hotels=[{id:1,name:'Pune'},
    {id:2,name:'Nagpur'},
    {id:3,name:'Hyderabad'},
    {id:4,name:'Banglore'},
    {id:5,name:'Aurangabad'},
    {id:6,name:'Dehli'},
    {id:7,name:'Mumbai'},
    {id:8,name:'Jaipur'},
    {id:9,name:'Indore'},
    {id:10,name:'jabalpur'},
    {id:11,name:'Mysore'},
    {id:12,name:'Chennai'},
    {id:13,name:'Amritsar'},
    {id:14,name:'Kokatha'}];
    get background() {
        return `height: 25rem; 
                background-image: url(${background});
                background-size: cover;
                background-repeat: no-repeat;`;
    }
}