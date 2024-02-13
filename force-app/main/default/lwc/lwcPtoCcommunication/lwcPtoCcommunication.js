import { LightningElement } from 'lwc';

export default class LwcPtoCcommunication extends LightningElement {

    searchText;
    parentusername;
    handlenameChange(event) {

        /*    const name = event.target.value;
            this.searchText = name;*/
    }
    handleClick(event) {

        //declarative apporach
        this.searchText = this.template.querySelector('lightning-input').value;
        this.parentusername = this.refs.username.value; //by usinf refs
        // this.refs.child1.name = this.searchText;
        //this.name = this.searchText;
        console.log(this.searchText);
        console.log(this.parentusername);

        ///Programmatic apporach
        this.refs.child1.name = this.parentusername;
    }


}