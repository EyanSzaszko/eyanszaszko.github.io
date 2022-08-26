
// start a typewriter animation for a text in the dataText array
export function StartTextAnimation(i) {
    if (typeof dataText[i] == 'undefined') {
        setTimeout(function() {
            StartTextAnimation(0);
        }, 10000);
    }
    // check if dataText[i] exists
    if (i < dataText[i].length) {
        // text exists! start typewriter animation
        typeWriter(dataText[i], 0, function() {
            // after callback (and whole text has been animated), start next text
            setTimeout(() => { StartTextAnimation(i + 1); }, 500);
        });
    }
}
