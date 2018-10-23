export function addWindowEventListener(type, handler) {
    if (!type) {
        throw new Error("The event type cannot be blank.");
    }

    let func;
    if (window.addEventListener) {
        func = window.addEventListener;
    } else if (window.attachEvent) {
        func = window.attachEvent;
        if (type === 'click') {
            type = 'onclick';
        }
    }
    func(type, handler, false);
}

export function removeWindowEventListener(type, handler) {
    window.removeEventListener(type, handler, false);
}

export function preventEvent(evt) {
    evt.preventDefault();
    evt.stopPropagation();
}