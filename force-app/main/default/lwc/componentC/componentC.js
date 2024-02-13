import { LightningElement } from 'lwc';

export default class ComponentC extends LightningElement {
    userName;
    handlenameChange(event) {
        this.userName = event.target.value;
        //console.log(this.userName);
    }
    handleClick() {
        //function should be lowercase
        const cust = new CustomEvent('usernamechange',
            /*
            If we pass data from child to grand parent with this apporach it will diffcult the bcz with same
             name other functions are available. Instead of this declare same event in parent comp and the call
             option 2:-using we can use LMS pass data from direct to child to grandparent.
             
                        {
                            bubbles: true, composed: true,
                            detail: { userName: this.userName } //we send data as object
                        });
            */
            //{detail:this.userName }); //single value
            {

                detail: { userName: this.userName } //we send data as object
            });
        this.dispatchEvent(cust);
        console.log(cust)
    }
}