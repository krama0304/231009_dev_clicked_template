import { LightningElement, api } from "lwc";

export default class LwcScenariochild extends LightningElement {
	@api selectedpicklist;
	name;
	phone;
	email;
	showname() {
		this.template.querySelector("lightning-input[data-id=in1]").class = "slds-show";
		this.template.querySelector("lightning-input[data-id=in2]").class = "slds-hide";
		this.template.querySelector("lightning-input[data-id=in3]").class = "slds-hide";
	}
	showphone() {
		this.template.querySelector("lightning-input[data-id=in2]").class = "slds-show";
		this.template.querySelector("lightning-input[data-id=in1]").class = "slds-hide";
		this.template.querySelector("lightning-input[data-id=in3]").class = "slds-hide";
	}
	showemail() {
		this.template.querySelector("lightning-input[data-id=in3]").class = "slds-show";
		this.template.querySelector("lightning-input[data-id=in2]").class = "slds-hide";
		this.template.querySelector("lightning-input[data-id=in1]").class = "slds-hide";
	}
}
