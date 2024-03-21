import { LightningElement } from "lwc";

export default class LwcScenarioparent extends LightningElement {
	selectedTypeValue;
	get Options() {
		return [
			{ value: "Show Input 1", label: "Show Input 1", description: "Show Input 1" },
			{
				value: "Show Input 2",
				label: "Show Input 2",
				description: "Show Input 2"
			},
			{
				value: "Show Input 3",
				label: "Show Input 3",
				description: "Show Input 3"
			}
		];
	}
	handleTypeChange(event) {
		this.selectedTypeValue = event.detail.value;
		switch (this.selectedTypeValue) {
			case "Show Input 1":
				this.template.querySelector("c-lwc-Scenariochild").showname();
				break;
			case "Show Input 2":
				this.template.querySelector("c-lwc-Scenariochild").showphone();
				break;
			case "Show Input 3":
				this.template.querySelector("c-lwc-Scenariochild").showemail();
				console.log("Score value is 20");
				break;
			default:
				console.log("Score value is neither 10 or 20");
		}
	}
}
