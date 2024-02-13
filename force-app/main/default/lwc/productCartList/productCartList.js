import { LightningElement, api, wire, track } from "lwc";
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
// messageChannels
import {
    subscribe,
    unsubscribe,
    MessageContext

} from "lightning/messageService";
import CART_CHANNEL from "@salesforce/messageChannel/productSelectedChannel__c";
//apex
import getSelectedProducts from "@salesforce/apex/ProductService.getSelectedProducts";
import getAccount from "@salesforce/apex/ProductService.accountInfo";


import createRecord from "@salesforce/apex/ProductService.createOrderRecord";
//import { createRecordInputFilteredByEditedFields } from "lightning/uiRecordApi";
export default class ProductCartList extends LightningElement {

    subscription = null;
    receivedMessage;

    @track accountRecord = ACCOUNT_OBJECT;

    @track addCartMap = {};
    @track productWrap;
    @track productList;
    @track cartTitle = 'Cart Details (0)';
    @track isModalOpen = false;
    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeMC();
    }

    disconnectedCallback() {
        this.unsubscribeMC();
    }
    subscribeMC() {
        if (this.subscription) {
            return;
        }
        this.subscription = subscribe(
            this.messageContext,
            CART_CHANNEL,
            (message) => {
                console.log("message " + JSON.stringify(message));
                console.log('cart channel');
                this.addCartMap = message.selectedData;
                this.findSelectedProducts();
            }
        );
    }

    unsubscribeMC() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    findSelectedProducts() {

        getSelectedProducts({ productIdMap: this.addCartMap })
            .then((result) => {
                this.productWrap = result;
                this.productList = result.productLineList;
                this.cartTitle = 'Cart Details (' + result.count + ')';
                if (result.count < 1) {
                    this.productList = null;
                }
            })
            .catch((error) => {
            });
    }

    openModal() {
        // to open modal set isModalOpen tarck value as true

        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
        this.accountRecord.Name = '';
        this.accountRecord.Email__c = '';
        this.accountRecord.BillingStreet = '';
        this.accountRecord.BillingCity = '';
        this.accountRecord.BillingState = '';
        this.accountRecord.BillingCountry = '';
        this.accountRecord.BillingPostalCode = '';

    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing

        if (this.checkIfError()) {

            var country = this.accountRecord.BillingCountry;
            if (!country) {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Please fill country field',
                        variant: 'error'
                    }),
                );
            } else {

                createRecord({
                    acc: this.accountRecord,
                    productIdMap: this.addCartMap
                })
                    .then(result => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Success',
                                message: 'Order created Successfully',
                                variant: 'success'
                            }),
                        );


                        this.closeModal();

                        this.publishChange();

                        this.addCartMap = {};
                        this.findSelectedProducts();

                    })
                    .catch(error => {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: 'Error creating record',
                                message: error.body.message,
                                variant: 'error'
                            }),
                        );
                    });

            }

        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Please fill all required fields',
                    variant: 'error',
                }),
            );
        }

    }
    findAccount() {

        getAccount({ emailId: this.accountRecord.Email__c })
            .then((result) => {
                if (result != null) {
                    this.accountRecord.BillingStreet = result.BillingStreet;
                    this.accountRecord.BillingCity = result.BillingCity;
                    this.accountRecord.BillingPostalCode = result.BillingPostalCode;
                    this.accountRecord.BillingState = result.BillingState;
                    this.accountRecord.BillingCountry = result.BillingCountry;
                }

            })
            .catch((error) => {
            });
    }

    checkIfError() {

        const isInputsCorrect = [...this.template.querySelectorAll('lightning-input')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);

        const isInputsCorrect1 = [...this.template.querySelectorAll('lightning-input-address')]
            .reduce((validSoFar, inputField) => {
                inputField.reportValidity();
                return validSoFar && inputField.checkValidity();
            }, true);

        if (isInputsCorrect && isInputsCorrect1) {
            return true;
        } else {
            false;
        }
    }

    addressInputChange(event) {

        this.accountRecord.BillingStreet = event.target.street;
        this.accountRecord.BillingCity = event.target.city;
        this.accountRecord.BillingState = event.target.province;
        this.accountRecord.BillingCountry = event.target.country;
        this.accountRecord.BillingPostalCode = event.target.postalCode;
        console.log(event.target.street);
    }

    onChangeVal(event) {

        if (event.target.name == 'Name') {
            this.accountRecord.Name = event.target.value;
        } else if (event.target.name == 'Email') {
            this.accountRecord.Email__c = event.target.value;
            this.findAccount();

        }

    }

    publishChange() {
        const message = {
            filtersData: {
                families: [],
                minPrice: null,
                maxPrice: null,
                size: [],
                brand: [],
                color: [],
                reset: true
            }
        };
        //  publish(this.messageContext, FILTER_CHANNEL, message);
    }
}