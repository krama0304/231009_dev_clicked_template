import { createElement } from 'lwc';
import GenericParentAccountHighlights from 'c/genericParentAccountHighlights';

describe('c-generic-parent-account-highlights', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-generic-parent-account-highlights', {
            is: GenericParentAccountHighlights
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});