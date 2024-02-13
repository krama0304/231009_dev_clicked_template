import { createElement } from 'lwc';
import Mp_LDSRecordform from 'c/mp_LDSRecordform';

describe('c-mp-lds-recordform', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-mp-lds-recordform', {
            is: Mp_LDSRecordform
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});