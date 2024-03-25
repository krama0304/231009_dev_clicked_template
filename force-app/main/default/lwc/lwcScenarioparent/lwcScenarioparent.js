import { LightningElement } from "lwc";

export default class LwcScenarioparent extends LightningElement {
	selectedTypeValue;

	get Options() {
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
	handleTypeChange(event) {
		console.log("parent selected value" + event.detail.value);
		this.showChild = true;
		this.selectedTypeValue = event.detail.value;
	}
}
