import { LightningElement } from 'lwc';

export default class ComponentA extends LightningElement {
    nameFromC;
    handleChilddata(event) {
        this.nameFromC = event.detail.userName;

    }
}