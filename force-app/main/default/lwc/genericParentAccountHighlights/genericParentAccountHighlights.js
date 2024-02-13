import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi'
export default class GenericParentAccountHighlights extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api accountFieldName;
    //wire getRecord with this record's Id to property called myRecord
    @wire(getRecord, { recordId: '$recordId', fields: '$fields' }) myRecord;

    // create dynamic field array
    get fields() {
        let returnValue = [];
        returnValue.push(this.accountFieldNameForGetRecord);
        return returnValue;
    }
    // define the combination of sobject name + account relationship field name
    get accountFieldNameForGetRecord() {
        console.log('accountFieldNameForGetRecord::::' + this.objectApiName + '.' + this.accountFieldName);
        return this.objectApiName + '.' + this.accountFieldName;

    }
    // flag to show error if configured improperly
    get isMissingFieldName() {
        return !(this.accountFieldName);

    }
    //extract AccountId from generic sobject record
    get accountId() {
        if (this.accountFieldName &&
            this.myRecord &&
            this.myRecord.data &&
            this.myRecord.data.fields &&
            this.myRecord.data.fields[this.accountFieldName] &&
            this.myRecord.data.fields[this.accountFieldName].value) {
            return this.myRecord.data.fields[this.accountFieldName].value;
        }
        return undefined;
    }
}