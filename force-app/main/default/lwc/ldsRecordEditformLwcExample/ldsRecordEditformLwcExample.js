import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FNAME_FIELD from '@salesforce/schema/contact.FirstName';
import LNAME_FIELD from '@salesforce/schema/contact.LastName';
import AccountId_FIELD from '@salesforce/schema/contact.AccountId';
import SALUTATION_FIELD from '@salesforce/schema/contact.Salutation';

import { NavigationMixin } from 'lightning/navigation';

export default class LdsRecordEditformLwcExample extends NavigationMixin(LightningElement) {
    fields = [FNAME_FIELD, LNAME_FIELD, AccountId_FIELD, SALUTATION_FIELD];
    @api recordId;
    fnameField = FNAME_FIELD;
    lnameField = LNAME_FIELD;
    accountIdField = AccountId_FIELD;
    salutationField = SALUTATION_FIELD;
    showToastBar = false;
    contactId;

    handleSuccess(event) {

        this.contactId = event.detail.id;
        this.showToastBar = true;

        /*const evt = new ShowToastEvent({
            title: "Sucessfully created",
            message: "Record Created" + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);*/
    }
    closeModel() {
        //this.showToastBar = false;
        alert('hiello');
        console.log(this.contactId);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.contactId,
                objectApiName: 'Contact',
                actionName: 'view'
            },
        });

    }
}