export function typeWriter(text, i, fnCallback) {
    // check if text isn't finished yet
    if (i < (text.length)) {
        // add next character to h1
        document.querySelector("h1").innerHTML = text.substring(0, i + 1) + '<span id="typewriterCaret" aria-hidden="true"></span>';

        // wait for a while and call this function again for next character
        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback);
        }, 100);
    }

    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
        // call callback after timeout
        setTimeout(fnCallback, 500);
    }
}
