/**
 * @function dropdownCheck
 * @param {MouseEvent} event - event of mouse click
 * @param {Function} callbackFn - function to call after the elements check (usually a function to toggle the dropdown)
 * @param {!Array<HTMLElement>} avoidedElements - elements that are inside the dropdown (the click on these elements
 * should not toggle the dropdown)
 * */

const dropdownCheck = (event, callbackFn, avoidedElements) => {
    if (!avoidedElements || avoidedElements.length <= 0) {
        console.error('Received empty array of elements to avoid toggling the dropdown');
        return false;
    }

    /**
     * @function isCurrentElementOutsideDropdown
     * @param {EventTarget} currentElement - element to check
     * */
    function isCurrentElementOutsideDropdown(currentElement) {
        if (!avoidedElements || avoidedElements.length <= 0) {
            console.error('Received empty array of elements to avoid toggling the dropdown');
            return false;
        }

        for (const avoidedElement of avoidedElements) {
            if (avoidedElement.current.contains(currentElement)) {
                return false;
            }
        }

        return true;
    }

    if (isCurrentElementOutsideDropdown(event.target)) {
        callbackFn(); //toggle the dropdown
    }
};

export default dropdownCheck;