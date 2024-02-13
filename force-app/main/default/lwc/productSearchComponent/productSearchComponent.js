import { LightningElement, track, wire, api } from 'lwc';
import {
    MessageContext, publish
} from "lightning/messageService";
// apex
import getProducts from "@salesforce/apex/ProductService.getProducts";
import CART_CHANNEL from "@salesforce/messageChannel/productSelectedChannel__c";
//import FILTER_CHANNEL from "@salesforce/messageChannel/productFilterChannel__c";
export default class ProductSearchComponent extends LightningElement {
    searchKey = "";
    @api wiredproducts;
    checkflag = false;
    error;
    @track addCartMap = {};
    subscription = null;
    receivedMessage;

    connectedCallback() {
        //this.subscribeMC();
        // this.findProducts();
    }
    disconnectedCallback() {
        // this.unsubscribeMC();
    }
    subscribeMC() {

        if (this.subscription) {
            console.log('subscription 1');
            return;
        }
        /*
        this.subscription = subscribe(
            this.messageContext,
            FILTER_CHANNEL,
            (message) => {
                console.log('subscription 2');
                console.log("message " + JSON.stringify(message));
                if (message.filtersData.reset) {
                    this.addCartMap = {};
                    this.wiredProducts = [];
                    this.findProducts();
                } else {
                    this.filtersData = message.filtersData;
                    this.findProducts();
                }
            }
        );*/
    }

    unsubscribeMC() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    publishChange() {
        const message = {
            selectedData: this.addCartMap
        };
        publish(this.messageContext, CART_CHANNEL, message);
    }
    @wire(MessageContext)
    messageContext;


    findProducts() {
        //console.log('call findProduct');
        getProducts({ name: this.searchKey, productIdMap: this.addCartMap })
            .then((result) => { this.wiredproducts = result; })
            .catch((error) => { this.error = error });
        // console.log(this.wiredProducts);
        //  this.refs.prodlist.products = this.wiredProducts;
        if (this.wiredproducts != null) {
            this.checkflag = true;
        }
        console.log('isproductsloaded' + this.checkflag);
    }

    handleSearch(event) {
        /* console.log('parent comp' + event);
         console.log('Parent Component :::' + event.detail.searchKey);//searchkey
        
         console.log('Parent Component :::' + this.searchKey);//searchkey*/
        this.searchKey = event.detail.searchKey;
        this.findProducts();
    }
    handleAddToCart(event) {

        this.addCartMap[event.detail.productId] = parseInt(event.detail.selectedQuantity);
        console.log('event.detail.productId' + event.detail.productId);
        console.log('event.detail.selectedQuantity' + event.detail.selectedQuantity);
        console.log(JSON.stringify(this.addCartMap));
        console.log(this.addCartMap);
        this.publishChange();

    }

    handleRemovedFromCart(event) {
        if (this.addCartMap.hasOwnProperty(event.detail.productId)) {
            delete this.addCartMap[event.detail.productId];


            this.publishChange();

        }
    }
}