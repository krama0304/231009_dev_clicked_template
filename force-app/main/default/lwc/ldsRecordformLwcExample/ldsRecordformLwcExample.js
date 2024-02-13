import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import FNAME_FIELD from '@salesforce/schema/contact.FirstName';
import LNAME_FIELD from '@salesforce/schema/contact.LastName';
import AccountId_FIELD from '@salesforce/schema/contact.AccountId';
import SALUTATION_FIELD from '@salesforce/schema/contact.Salutation';
export default class LdsRecordformLwcExample extends LightningElement {
    //Contact Fields (Account Id, Salutation, First Name & Last Name)
    fields = [AccountId_FIELD, SALUTATION_FIELD, FNAME_FIELD, LNAME_FIELD];
    handleSucess(event) {
        const evt = new ShowToastEvent({
            title: "Sucessfully created",
            message: "Record Created" + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);

    }
}