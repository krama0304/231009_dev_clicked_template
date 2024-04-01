import { LightningElement, api } from "lwc";

export default class Chilcomp extends LightningElement {
	name;
	phone;
	email;
	selectedvalues = "";
	@api
	get selectedvaluesinput() {
		return this.selectedvalues;
	}
	set selectedvaluesinput(value) {
		this.selectedvalues = value;
		this.filterTodos();
	}

	filterTodos() {
		console.log("this.filterTodos" + this.selectedvalues);
		const inputElement = this.template.querySelector(".name1");
		const inputElement1 = this.template.querySelector(".phone1");
		const inputElement2 = this.template.querySelector(".email1");

		if (inputElement) {
			console.log(inputElement);
			inputElement.classList.remove("classhide");
			//inputElement.classList.remove('classshow');
		}
		if (inputElement1) {
			inputElement1.classList.remove("classhide");
			//inputElement1.classList.remove('classshow');
		}
		if (inputElement2) {
			inputElement2.classList.remove("classhide");
			//            inputElement2.classList.remove('classshow');
		}
		switch (this.selectedvalues) {
			case "Input1":
				inputElement.classList.add("classshow");
				inputElement1.classList.add("classhide");
				inputElement2.classList.add("classhide");
				break;
			case "Input2":
				inputElement.classList.add("classhide");
				inputElement1.classList.add("classshow");
				inputElement2.classList.add("classhide");
				break;
			case "Input3":
				inputElement.classList.add("classhide");
				inputElement1.classList.add("classhide");
				inputElement2.classList.add("classshow");
				break;
			default:
			/* inputElement.classList.add('classhide');
             inputElement1.classList.add('classhide');
             inputElement2.classList.add('classhide');*/
		}
	}

	/* @api replaceClass() {
         const inputElement = this.template.querySelector('[data-id="inputElement"]');
         if (inputElement) {
             inputElement.classList.remove('old-class');
             inputElement.classList.add('new-class');
         }
     }*/
}
