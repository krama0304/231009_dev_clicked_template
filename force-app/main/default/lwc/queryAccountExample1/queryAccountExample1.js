import { LightningElement, wire } from 'lwc';
import getRecords from '@salesforce/apex/AccountApex.queryAccount';
const COLUMNS = [

    {
        label: 'Name', fieldName: 'accountUrl', type: "url",
        typeAttributes: {
            label: { fieldName: 'Name' },
            target: '_blank'
        }
    },
    { label: 'Rating', fieldName: 'Rating', type: "text" },
    { label: 'Name', fieldName: 'Industry', type: "text" }
];
export default class QueryAccountExample1 extends LightningElement {

    columns = COLUMNS;
    accoundata = [];
    searchText;
    showData = false;
    //@wire(getRecords) queryAccounts; 
    @wire(getRecords) queryAccounts({ data, error }) {
        if (data) {
            this.showData = true;
            //Array.prototype.map()
            //he map() method of Array instances creates a new array populated with the results of calling a provided function on every element in the calling array.
            //... Because arrays in JS are reference values, so when you try to copy it using the = it will only copy the reference to the original array and not the value of the array. To create a real copy of an array, you need to copy over the value of the array under a new value variable. That way this new array does not reference to the old array address in memory.

            this.accoundata = data.map(acc => ({
                ...acc,
                accountUrl: '/' + acc.Id 
            }));
        }
        else if (error) {
            this.showData = false;
        }
    }
}

