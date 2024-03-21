import { LightningElement, api } from "lwc";

export default class ListviewButtonFlow extends LightningElement {
	@api ids;

	connectedCallback() {
		console.log("connectedCallback");

		if (this.ids) {
			console.log("connectedCallback inside if");
			// eslint-disable-next-line @lwc/lwc/no-api-reassignments
			this.ids = this.ids.split(",").filter(function (e) {
				// eslint-disable-next-line eqeqeq
				return e != null && e != "";
			});
		}
	}
}
