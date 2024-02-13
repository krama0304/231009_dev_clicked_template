import { LightningElement, api } from 'lwc';

export default class ProductsList extends LightningElement {
    @api products;
    @api isproductsloaded;

    handleAddToCart(event) {
        this.isAddedToCart = true;
        this.dispatchEvent(
            new CustomEvent("addedtocart", {
                detail: {
                    productId: event.detail.productId,
                    selectedQuantity: event.detail.selectedQuantity
                }
            })
        );
    }
    handleRemovedFromCart(event) {
        this.dispatchEvent(
            new CustomEvent("removedfromcart", {
                detail: {
                    productId: event.detail.productId
                }
            })
        );

    }
}