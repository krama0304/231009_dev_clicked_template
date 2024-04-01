import { LightningElement, api } from "lwc";

export default class Lc_hookschild extends LightningElement {
	name;
	phone;
	email;
	constructor() {
		super();
		console.log("Child-constructor");
	}

	@api
	set selectedTypeValue1(value) {
		console.log("hello");
		if (value === "Input1") {
			this.name = "Some Value";
			this.phone = "";
			this.email = "";
		} else if (value === "Input2") {
			this.name = "";
			this.phone = "Some Value";
			this.email = "";
		} else if (value === "Input3") {
			this.name = "";
			this.phone = "";
			this.email = "Some Value";
		}
	}
	@api showname() {
		console.log("showname");
		this.template.querySelector("lightning-input[data-id=in1]").classList.add("slds-show");
		this.template.querySelector("lightning-input[data-id=in2]").classList.add("slds-show");
		this.template.querySelector("lightning-input[data-id=in1]").classList.add("slds-show");
		//this.template.querySelector("lightning-input[data-id=in2]").class = "slds-hide";
		// this.template.querySelector("lightning-input[data-id=in3]").class = "slds-hide";
		console.log("End");
	}
	@api showphone() {
		console.log("showphone");
		this.template.querySelector("lightning-input[data-id=in1]").classList.add("slds-show");
		this.template.querySelector("lightning-input[data-id=in2]").classList.add("slds-show");
		this.template.querySelector("lightning-input[data-id=in1]").classList.add("slds-show");
		console.log("End");
	}
	@api showemail() {
		console.log("showemail");
		//this.template.querySelector("lightning-input[data-id=in3]").value = "Some Value";
		this.template.querySelector("lightning-input[data-id=in1]").classList.add("slds-show");
		this.template.querySelector("lightning-input[data-id=in2]").classList.add("slds-show");
		//  this.template.querySelector("lightning-input[data-id=in1]").classList.add("slds-show");
		console.log("End");
	}
	render() {
		console.log("child-render");
	}
	connectedCallback() {
		console.log(" Child-connectedCallback");
	}
	renderedCallback() {
		console.log("Child- renderedCallback");
	}
	disconnectedCallback() {
		console.log("Child-     disconnectedCallback");
	}
	errorCallback(error, stack) {
		console.log("Child-     Error Callback");
		console.log("errorCallback" + error);

		console.log("Stack" + stack);
	}
}
