import { LightningElement } from 'lwc';
//import { createRecord } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';

//uiRecordApi
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import NAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/contact.Email';

export default class ContactCreatorLDS_record extends LightningElement {
    fields = [NAME_FIELD, LNAME_FIELD, EMAIL];
    handleSuccess(event) {
        /*    console.log('Account detail : ', event.detail.fields);
            console.log('Account name : ', event.detail.fields.Name);
            const evt = new ShowToastEvent({
                title: 'Contact created',
                message: 'Record ID: ' + event.detail.id,
                variant: 'success',
            });
            this.dispatchEvent(evt);*/
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Contact',
                actionName: 'list'
            },
            state: { filterName: 'Recent' },
        });







    }
    /*
     //variable declaration
     accountId;
     fname;
     lname;
     email;
    handleReset(event) {
        var input = this.template.querySelectorAll('lightning-input');
        input.forEach(element => { element.reset(); });


    }
    handleSuccess(event) {
        event.preventDefault();
        //For Single Input
        //var input=this.template.querySelector("lightning-input").value;

        //For more than one single Input
        var inputs = this.template.querySelectorAll("lightning-input");//collection
        inputs.forEach(function (element) {
            if (element.name === 'fname')
                this.fname = element.value;
            else if (element.name === 'lname')
                this.lname = element.value;
            else if (element.name === 'email')
                this.email = element.value;
        }, this);
        //First we need get the input fields
        const field = { 'First Name': this.fname, 'Last Name': this.lname, 'Email': this.email };
        //prepare Api data
        const recorData = { apiName: 'Contact', field };
        createRecord(recorData).then(
            accountid => {
                this.accountid = accountid.id;
                this.dispatchEvent(new ShowToastEvent({
                    title: "Account Created",
                    message: "Record Created Sucessfully" + event.detail.id,
                    variant: 'success'
                }),
                );


            }
        ).catch();
        //  event.submit();

    }
*/


}