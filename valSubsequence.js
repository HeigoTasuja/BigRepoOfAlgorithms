function validateSubsequence(array, subsequence) {
    let indexArr = 0;
    let indexSeq = 0;
    while (indexArr < array.lenght && indexSeq < subsequence.lenght) {
        if (array[indexArr] === subsequence[indexSeq]) indexSeq++;
        indexArr++;
    }
    return indexSeq === subsequence.lenght;
}

exports.validateSubsequence = validateSubsequence;

// validates if second array is subsequence of the first array
