import { LightningElement } from 'lwc';

export default class ProductSearchForm extends LightningElement {

    handleSearch(event) {
        // console.log('Product Search :::' + event.target.value);

        /*const evt = new CustomEvent('search',
            {
                detail: { searchkey: this.searchval }
            });
        this.dispatchEvent(evt);*/
        //Above code is not working bcz of the on hadle change.it will working for the on button click
        this.dispatchEvent(
            new CustomEvent("search", {
                detail: { searchKey: event.target.value }
            })
        );





    }
}
