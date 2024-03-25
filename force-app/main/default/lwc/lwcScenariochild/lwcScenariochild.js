import { LightningElement, api } from "lwc";

export default class LwcScenariochild extends LightningElement {
	@api selectedpicklist = "";
	name;
	phone;
	email;

	@api selectedValue;

	get showName() {
		return this.selectedpicklist === "Input1" ? true : false;
	}

	get showPhone() {
		return this.selectedpicklist === "Input2" ? true : false;
	}

	get showEmail() {
		return this.selectedpicklist === "Input3" ? true : false;
	}
}
