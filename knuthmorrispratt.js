function knuthMorrisPratt(string, substring) {
    const pattern = buildPattern(substring);
    return matches(string, substring, pattern);
}

function buildPattern(substring) {
    const pattern = new Array(substring.length).fill(-1);
    let j = 0, i = 0;
    while (i < substring.length) {
        if (substring[i] === substring[j]) {
            pattern[i] = j;
            i++; j++;
        } else if (j > 0) {
            j = pattern[j - 1] + 1;
        } else {
            i++;
        }
    }
    return pattern;
}

function matches(string, substring, pattern) {
    let i = 0, j = 0;
    while (i + substring.length - j <= string.length) {
        if (string[i] === substring[j]) {
            if (j === substring.length - 1) return true;
            i++; j++;
        } else if (j > 0) {
            j = pattern[j - 1] + 1;
        } else {
            i++;
        }
    }
    return false;
}
