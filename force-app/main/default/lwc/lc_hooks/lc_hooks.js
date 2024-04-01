import { LightningElement } from "lwc";

export default class Lc_hooks extends LightningElement {
	constructor() {
		super();
		console.log("constructor");
	}
	selectedTypeValue;
	/* Selection() {
         console.log('noselection');
         const inputElement = this.template.querySelector('.name2');
         if (inputElement) {
             console.log('inputElement' + inputElement);
             // this.template.querySelector('.name2').classList.add('classshow');
             inputElement.classList.remove('classhide');
             inputElement.classList.add('classshow');
             //
             // inputElement.classList.toggle('classhide');
             //  console.log(this.template.querySelector("lightning-input[data-id=in1]").classList);
         }
         this.template.querySelector('.noBtn').classList.add('dynamicCSS1');
 
     }*/
	get Options() {
		console.log("getoptions");
		return [
			{ value: "Input1", label: "Input1", description: "Input 1" },
			{
				value: "Input2",
				label: "Input2",
				description: "Input 2"
			},
			{
				value: "Input3",
				label: "Input3",
				description: "Input 3"
			}
		];
	}
	connectedCallback() {
		console.log("connected connectedCallback");
	}
	hasRendered = true;
	renderedCallback() {
		console.log(" renderedCallback");
	}
	disconnectedCallback() {
		console.log(" disconnectedCallback");
	}
	errorCallback(error, stack) {
		console.log("errorCallback" + error);

		console.log("Stack" + stack);
	}
	handleTypeChange(event) {
		console.log("parent selected value" + event.detail.value);
		this.selectedTypeValue = event.detail.value;
	}
}
