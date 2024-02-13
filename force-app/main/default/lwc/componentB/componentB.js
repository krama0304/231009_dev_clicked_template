import { LightningElement } from 'lwc';

export default class ComponentB extends LightningElement {
    nameFromC;
    handleChilddata(event) {

        this.nameFromC = event.detail.userName;
        //this.nameFromC = event.detail;
        const cust = new CustomEvent('usernamechange',
            {

                detail: { userName: this.nameFromC } //we send data as object
            });
        this.dispatchEvent(cust);
        console.log(cust)
    }
}